import "../config";
import mongojs from "mongojs";

import { UserSessionNotFound, Unauthorized } from "../../errors";

import UserSessionMapper from "../../components/user/UserSessionMapper";

const { DATABASE_NAME, MONGO_PORT_27017_TCP_ADDR, MONGO_PORT_27017_TCP_PORT } = process.env;

const connection = mongojs(MONGO_PORT_27017_TCP_ADDR ? `mongodb://${MONGO_PORT_27017_TCP_ADDR}:${MONGO_PORT_27017_TCP_PORT}/${DATABASE_NAME}` : DATABASE_NAME);
const collection = connection.collection("userSessions"); // collection(s) name

const mapper = new UserSessionMapper(connection); // mapper to test

/* globals beforeEach,afterAll,test,expect,describe */

beforeEach((done) => {
    collection.drop(() => {
        done();
    });
});

afterAll((done) => {
    connection.close(() => {
        done();
    });
});

describe("As an user of \x1b[1mUser Session Mapper\x1b[0m when using ", () => {
    describe("\x1b[1m`updateUserSession()`\x1b[0m should:", () => {
        test("create the user session", async () => {
            const session = await mapper.updateUserSession("userId", "tokenDataNew", new Date(), "::ffff:127.0.0.1", "test2");
            expect(session).not.toHaveProperty("usernameLoginHash", "usernameLoginHash");
            expect(session).toHaveProperty("userId", "userId");
            expect(session).toHaveProperty("token", "tokenDataNew");
            expect(session).toHaveProperty("ipAddress", "::ffff:127.0.0.1");
            expect(session).toHaveProperty("expiresAt");
            expect(session).toHaveProperty("username", "test2");
        });
        test("update the user session if the username and ipAddress was already assigned to a session", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData",
                    expiresAt: now,
                },
            ];
            collection.insert(fixture, async () => {
                const session = await mapper.updateUserSession("userIdLoginHash", "tokenDataNew", new Date(new Date().getTime() + 1), "::ffff:127.0.0.1", "test");
                expect(session.username).toEqual("test");
                expect(session.token).toEqual("tokenDataNew");
                expect(session.expiresAt).not.toEqual(now);
                done();
            });
        });
        test("create the user session if the username was already assigned to a session", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData",
                    expiresAt: now,
                },
            ];
            collection.insert(fixture, async () => {
                const session = await mapper.updateUserSession("userId", "tokenDataNew", new Date(new Date().getTime() + 1), "::ffff:127.0.0.2", "test2");
                expect(session.username).toEqual("test2");
                expect(session.token).toEqual("tokenDataNew");
                expect(session.expiresAt).not.toEqual(now);
                done();
            });
        });
        test("create the user session if the ipAddress was already assigned to a session", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData",
                    expiresAt: now,
                },
            ];
            collection.insert(fixture, async () => {
                const session = await mapper.updateUserSession("userId", "tokenDataNew", new Date(new Date().getTime() + 1), "::ffff:127.0.0.1", "test2");
                expect(session.username).toEqual("test2");
                expect(session.token).toEqual("tokenDataNew");
                expect(session.expiresAt).not.toEqual(now);
                done();
            });
        });
        test("update the user session and unset the deletedAt from the previous session", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    deletedAt: now,
                },
            ];
            collection.insert(fixture, async () => {
                const session = await mapper.updateUserSession("userId", "tokenDataNew", new Date(), "::ffff:127.0.0.1", "test");
                expect(session.username).toEqual("test");
                expect(session.token).toEqual("tokenDataNew");
                expect(session).toHaveProperty("userId");
                expect(session).toHaveProperty("expiresAt");
                expect(session).not.toHaveProperty("deletedAt");
                done();
            });
        });
    });
    describe("\x1b[1m`deleteUserSession()`\x1b[0m should:", () => {
        test("not delete an user session if the userId and token do not exist", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId2",
                    ipAddress: "::ffff:127.0.0.2",
                    token: "tokenData2",
                    expiresAt: new Date(now.getTime() + 86400 * 1000), // Tomorrow
                    username: "test2",
                },
            ];
            collection.insert(fixture, async () => {
                await expect(mapper.deleteUserSession("userId", "tokenData2", "::ffff:127.0.0.2")).rejects.toThrowError(new UserSessionNotFound());
                await expect(mapper.deleteUserSession("userId", "tokenData", "::ffff:127.0.0.2")).rejects.toThrowError(new UserSessionNotFound());
                await expect(mapper.deleteUserSession("userId2", "tokenData", "::ffff:127.0.0.2")).rejects.toThrowError(new UserSessionNotFound());
                done();
            });
        });
        test("not delete an user session if the session is expired", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData",
                    expiresAt: new Date(now.getTime() - 86400 * 1000), // Yesterday
                },
            ];
            collection.insert(fixture, async () => {
                await expect(mapper.deleteUserSession("userId", "tokenData", "::ffff:127.0.0.1")).rejects.toThrowError(new UserSessionNotFound());
                done();
            });
        });
        test("delete an user session if the session was found", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId1",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData1",
                    expiresAt: new Date(now.getTime() + 86400 * 1000), // Tomorrow
                    username: "test1",
                },
                {
                    userId: "userId2",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData2",
                    expiresAt: new Date(now.getTime() + 86400 * 1000), // Tomorrow
                    username: "test2",
                },
                {
                    userId: "userId3",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData3",
                    expiresAt: new Date(now.getTime() + 86400 * 1000), // Tomorrow
                    username: "test3",
                },
            ];
            collection.insert(fixture, async () => {
                const result = await mapper.deleteUserSession("userId2", "tokenData2", "::ffff:127.0.0.1");
                expect(result).not.toHaveProperty("token");
                expect(result).not.toHaveProperty("expiresAt");
                expect(result).toHaveProperty("userId");
                expect(result).toHaveProperty("ipAddress");
                expect(result).toHaveProperty("deletedAt");
                expect(result.username).toEqual("test2");
                done();
            });
        });
    });
    describe("\x1b[1m`verifyUserSession()`\x1b[0m should:", () => {
        test("not verify an user session if userId and token do not exist", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData",
                    expiresAt: new Date(now.getTime() + 86400 * 1000), // Tomorrow
                    username: "test",
                },
            ];
            collection.insert(fixture, async () => {
                await expect(mapper.verifyUserSession("userId", "tokenData2", "::ffff:127.0.0.1")).rejects.toThrowError(new Unauthorized());
                await expect(mapper.verifyUserSession("userId2", "tokenData2", "::ffff:127.0.0.1")).rejects.toThrowError(new Unauthorized());
                await expect(mapper.verifyUserSession("userId2", "tokenData", "::ffff:127.0.0.1")).rejects.toThrowError(new Unauthorized());
                done();
            });
        });
        test("not verify an user session if session is expired", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData",
                    expiresAt: new Date(now.getTime() - 86400 * 1000), // Yesterday
                    username: "test",
                },
            ];
            collection.insert(fixture, async () => {
                await expect(mapper.verifyUserSession("userId", "tokenData")).rejects.toThrowError(new Unauthorized());
                done();
            });
        });
        test("verify an user session if session is valid", (done) => {
            const now = new Date();
            const fixture = [
                {
                    userId: "userId",
                    ipAddress: "::ffff:127.0.0.1",
                    token: "tokenData",
                    expiresAt: new Date(now.getTime() + 86400 * 1000), // Tomorrow
                    username: "test",
                },
            ];
            collection.insert(fixture, async () => {
                const session = await mapper.verifyUserSession("userId", "tokenData", "::ffff:127.0.0.1");
                expect(session).toHaveProperty("userId", "userId");
                expect(session).toHaveProperty("ipAddress", "::ffff:127.0.0.1");
                expect(session).toHaveProperty("expiresAt");
                expect(session).not.toHaveProperty("deletedAt");
                expect(session).toHaveProperty("username", "test");
                done();
            });
        });
    });
});