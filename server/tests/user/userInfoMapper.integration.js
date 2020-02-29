import "../config";
import mongojs from "mongojs";

import { UserNotFound } from "../../errors";

import UserInfoMapper from "../../components/user/UserInfoMapper";

const { DATABASE_NAME, MONGO_PORT_27017_TCP_ADDR, MONGO_PORT_27017_TCP_PORT } = process.env;

const connection = mongojs(MONGO_PORT_27017_TCP_ADDR ? `mongodb://${MONGO_PORT_27017_TCP_ADDR}:${MONGO_PORT_27017_TCP_PORT}/${DATABASE_NAME}` : DATABASE_NAME);
const collection = connection.collection("users"); // collection(s) name

const mapper = new UserInfoMapper(connection); // mapper to test

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

describe("As an user of \x1b[1mUser Info Mapper\x1b[0m when using ", () => {
    describe("\x1b[1m`getUserInfo()`\x1b[0m should:", () => {
        test("return not found if database is empty", async () => {
            await expect(mapper.getUserInfo("userId")).rejects.toThrowError(new UserNotFound());
        });
        test("return not found if userId is not found", async () => {
            await expect(mapper.getUserInfo("userId")).rejects.toThrowError(new UserNotFound());
        });
        test("return userData for an account if userId is found", async (done) => {
            const fixture = [
                {
                    userId: "userId",
                    username: "test",
                    email: "test@test.com",
                    organizationId: "organizationId",
                    usernameLoginHash: "usernameLoginHash",
                    passwordLoginHash: "passwordLoginHash",
                    ipAddress: "127.0.0.1",
                    createdAt: new Date(),
                },
            ];
            collection.insert(fixture, async () => {
                const userData = await mapper.getUserInfo("userId");
                expect(userData).toHaveProperty("userId", "userId");
                expect(userData).toHaveProperty("username", "test");
                expect(userData).toHaveProperty("username", "test");
                expect(userData).toHaveProperty("email");
                expect(userData).toHaveProperty("organizationId");
                expect(userData).toHaveProperty("createdAt");
                done();
            });
        });
        test("not return any account sensitive information", async (done) => {
            const fixture = [
                {
                    _id: "ObjectIdMongo",
                    userId: "userId",
                    username: "test",
                    email: "test@test.com",
                    organizationId: "organizationId",
                    usernameLoginHash: "usernameLoginHash",
                    passwordLoginHash: "passwordLoginHash",
                    ipAddress: "127.0.0.1",
                    createdAt: new Date(),
                },
            ];
            collection.insert(fixture, async () => {
                const userData = await mapper.getUserInfo("userId");
                expect(userData).toHaveProperty("userId", "userId");
                expect(userData).toHaveProperty("username", "test");
                expect(userData).toHaveProperty("createdAt");
                expect(userData).toHaveProperty("email", "test@test.com");
                expect(userData).toHaveProperty("organizationId", "organizationId");
                expect(userData).not.toHaveProperty("_id", "ObjectIdMongo");
                expect(userData).not.toHaveProperty("usernameLoginHash", "usernameLoginHash");
                expect(userData).not.toHaveProperty("passwordLoginHash", "passwordLoginHash");
                expect(userData).not.toHaveProperty("ipAddress", "127.0.0.1");
                done();
            });
        });
    });
});