import "../config";
import mongojs from "mongojs";

import { UserNotFound, UsernameOrEmailConflict } from "../../errors";

import UserMapper from "../../components/user/UserMapper";

const { DATABASE_NAME, MONGO_PORT_27017_TCP_ADDR, MONGO_PORT_27017_TCP_PORT } = process.env;

const connection = mongojs(MONGO_PORT_27017_TCP_ADDR ? `mongodb://${MONGO_PORT_27017_TCP_ADDR}:${MONGO_PORT_27017_TCP_PORT}/${DATABASE_NAME}` : DATABASE_NAME);
const collection = connection.collection("users"); // collection(s) name
const userReservations = connection.collection("userReservations"); // collection(s) name

const mapper = new UserMapper(connection); // mapper to test

/* globals beforeEach,afterAll,test,expect,describe */

beforeEach((done) => {
    collection.drop(() => {
        userReservations.drop(() => {
            collection.ensureIndex({
                email: 1,
            }, {
                unique: 1,
            }, collection.ensureIndex({
                usernameLoginHash: 1,
            }, {
                unique: 1,
            }, done));
        });
    });
});

afterAll((done) => {
    connection.close(() => {
        done();
    });
});

describe("As an user of \x1b[1mUser Mapper\x1b[0m when using ", () => {
    describe("\x1b[1m`createUser()`\x1b[0m should:", () => {
        test("create an user in the database using userId, username, email, usernameLoginHash and passwordLoginHash", async () => {
            const user = await mapper.createUser("userId", "test", "test@test.com", "usernameLoginHash", "passwordLoginHash");
            expect(user).toHaveProperty("userId", "userId");
            expect(user).toHaveProperty("username", "test");
            expect(user).toHaveProperty("email", "test@test.com");
            expect(user).toHaveProperty("createdAt");
        });
        test("not return sensitive data about the user", async () => {
            const user = await mapper.createUser("userId", "test", "test@test.com", "usernameLoginHash", "passwordLoginHash");
            expect(user).not.toHaveProperty("usernameLoginHashAt");
            expect(user).not.toHaveProperty("passwordLoginHash");
        });
        test("not create an user in the database if usernameLoginHash is already used", async (done) => {
            await mapper.createUser("userId", "test", "test@test.com", "usernameLoginHash", "passwordLoginHash");
            await expect(mapper.createUser("userId", "test", "test2@test.com", "usernameLoginHash", "passwordLoginHash")).rejects.toMatchObject({
                message: expect.stringMatching(/^E11000 duplicate key error.+/),
            });
            done();
        });
        test("not create an user in the database if email is already used", async (done) => {
            await mapper.createUser("userId", "test", "test@test.com", "usernameLoginHash", "passwordLoginHash");
            await expect(mapper.createUser("userId", "test2", "test@test.com", "usernameLoginHash2", "passwordLoginHash")).rejects.toMatchObject({
                message: expect.stringMatching(/^E11000 duplicate key error.+/),
            });
            done();
        });
        test("not create an user in the database if email and usernameLoginHash is already used", async (done) => {
            await mapper.createUser("userId", "test", "test@test.com", "usernameLoginHash", "passwordLoginHash");
            await expect(mapper.createUser("userId", "test2", "test@test.com", "usernameLoginHash", "passwordLoginHash")).rejects.toMatchObject({
                message: expect.stringMatching(/^E11000 duplicate key error.+/),
            });
            done();
        });
    });
    describe("\x1b[1m`getUserByUsername()`\x1b[0m should:", () => {
        test("return error if the database is empty", async () => {
            await expect(mapper.getUserByUsername("usernameLoginHash")).rejects.toThrowError(new UserNotFound());
        });
        test("return error if usernameLoginHash is not found", async (done) => {
            const fixture = [
                {
                    username: "test",
                    email: "test@test.com",
                    usernameLoginHash: "usernameLoginHash",
                    passwordLoginHash: "passwordLoginHash",
                    ipAddress: "127.0.0.1",
                },
            ];
            collection.insert(fixture, async () => {
                await expect(mapper.getUserByUsername("usernameLoginHash2")).rejects.toThrowError(new UserNotFound());
                done();
            });
        });
        test("return an user if usernameLoginHash is found", async (done) => {
            const fixture = [
                {
                    _id: 1,
                    username: "test",
                    email: "test@test.com",
                    usernameLoginHash: "usernameLoginHash",
                    passwordLoginHash: "passwordLoginHash",
                    ipAddress: "127.0.0.1",
                },
            ];
            collection.insert(fixture, async () => {
                const user = await mapper.getUserByUsername("usernameLoginHash");
                expect(user).toHaveProperty("_id", 1);
                expect(user).toHaveProperty("username", "test");
                expect(user).toHaveProperty("email", "test@test.com");
                expect(user).toHaveProperty("usernameLoginHash", "usernameLoginHash");
                expect(user).toHaveProperty("passwordLoginHash", "passwordLoginHash");
                expect(user).toHaveProperty("ipAddress", "127.0.0.1");
                done();
            });
        });
    });
    describe("\x1b[1m`getUser()`\x1b[0m should:", () => {
        test("return error if the database is empty", async () => {
            await expect(mapper.getUser("userId")).rejects.toThrowError(new UserNotFound());
        });
        test("return error if userId is not found", async (done) => {
            const fixture = [
                {
                    userId: "id",
                    username: "test",
                    email: "test@test.com",
                    usernameLoginHash: "usernameLoginHash",
                    passwordLoginHash: "passwordLoginHash",
                    ipAddress: "127.0.0.1",
                },
            ];
            collection.insert(fixture, async () => {
                await expect(mapper.getUser("id2")).rejects.toThrowError(new UserNotFound());
                done();
            });
        });
        test("return an user if userId is found", async (done) => {
            const fixture = [
                {
                    _id: 1,
                    userId: "id",
                    username: "test",
                    nickname: "snowy",
                    email: "test@test.com",
                    usernameLoginHash: "usernameLoginHash",
                    passwordLoginHash: "passwordLoginHash",
                    ipAddress: "127.0.0.1",
                    createdAt: new Date(),
                },
            ];
            collection.insert(fixture, async () => {
                const user = await mapper.getUser("id");
                expect(user).not.toHaveProperty("_id", 1);
                expect(user).toHaveProperty("userId", "id");
                expect(user).toHaveProperty("username", "test");
                expect(user).toHaveProperty("nickname", "snowy");
                expect(user).toHaveProperty("email", "test@test.com");
                expect(user).not.toHaveProperty("usernameLoginHash", "usernameLoginHash");
                expect(user).not.toHaveProperty("passwordLoginHash", "passwordLoginHash");
                expect(user).not.toHaveProperty("ipAddress", "127.0.0.1");
                expect(user).toHaveProperty("createdAt");
                done();
            });
        });
    });
    describe("\x1b[1m`verifyReservedUsernameOrEmail()`\x1b[0m should:", () => {
        test("return null if the database is empty", async () => {
            const user = await mapper.verifyReservedUsernameOrEmail("usernameLoginHash", "test@test.com");
            expect(user).toEqual(null);
        });
        test("return null if usernameLoginHash or email is not found", async (done) => {
            const fixture = [
                {
                    _id: 1,
                    usernameLoginHash: "usernameLoginHash",
                    email: "test@test.com",
                },
            ];
            userReservations.insert(fixture, async () => {
                const reservation = await mapper.verifyReservedUsernameOrEmail("usernameLoginHash2", "test@test.com2");
                expect(reservation).toEqual(null);
                done();
            });
        });
        test("return null if usernameLoginHash and email is found", async (done) => {
            const fixture = [
                {
                    _id: 1,
                    usernameLoginHash: "usernameLoginHash",
                    email: "test@test.com",
                },
            ];
            userReservations.insert(fixture, async () => {
                const reservation = await mapper.verifyReservedUsernameOrEmail("usernameLoginHash", "test@test.com");
                expect(reservation).toEqual(null);
                done();
            });
        });
        test("return an error if usernameLoginHash or email is found", (done) => {
            const fixture = [
                {
                    _id: 1,
                    usernameLoginHash: "usernameLoginHash",
                    email: "test@test.com",
                },
            ];
            userReservations.insert(fixture, async () => {
                await expect(mapper.verifyReservedUsernameOrEmail("usernameLoginHash2", "test@test.com")).rejects.toThrowError(new UsernameOrEmailConflict());
                await expect(mapper.verifyReservedUsernameOrEmail("usernameLoginHash", "test@test.com2")).rejects.toThrowError(new UsernameOrEmailConflict());
                done();
            });
        });
    });
});