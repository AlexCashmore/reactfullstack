import "../config";

import { InternalServerError, NotFound, NotImplemented } from "../../errors";

import UserSessionModel from "../../components/user/UserSessionModel";

/* globals test,expect,describe,jest */

describe("As an user of \x1b[1mUser Sessions Model\x1b[0m when using ", () => {
    describe("\x1b[1m`updateUserSession()`\x1b[0m I should:", () => {
        test("return an error with status 500 in case of mapper error", async () => {
            const userSessionMapper = {
                updateUserSession: jest.fn().mockRejectedValue({
                    code: 500,
                    errmsg: "An error has occurred.",
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            await expect(model.updateUserSession("userId")).rejects.toThrowError(new InternalServerError());
        });
        test("create an user session using userId and ipAddress in ipv4", async () => {
            const userSessionMapper = {
                updateUserSession: jest.fn().mockImplementation((userId, token, expiresAt, ipAddress, username) => (
                    {
                        userId,
                        token,
                        expiresAt,
                        ipAddress,
                        username,
                    })),
            };
            const userMapper = {
                getUser: jest.fn().mockResolvedValue({
                    userId: "userId",
                    username: "test",
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
                userMapper,
            });
            const result = await model.updateUserSession("userId", "127.0.0.1");
            expect(result).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result).toHaveProperty("token");
            expect(result.token).not.toEqual({});
            expect(result.token).not.toEqual(null);
            expect(result).toHaveProperty("expiresAt");
            expect(result).toHaveProperty("username", "test");
            expect(result).toHaveProperty("userId");
        });
        test("create an user session using userId and ipAddress in ipv6", async () => {
            const userSessionMapper = {
                updateUserSession: jest.fn().mockImplementation((userId, token, expiresAt, ipAddress, username) => (
                    {
                        userId,
                        token,
                        expiresAt,
                        ipAddress,
                        username,
                    })),
            };
            const userMapper = {
                getUser: jest.fn().mockResolvedValue({
                    userId: "userId",
                    username: "test",
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
                userMapper,
            });
            const result = await model.updateUserSession("userId", "2001:0:ce49:7601:e866:efff:62c3:fffe");
            expect(result).toHaveProperty("ipAddress", "2001:0:ce49:7601:e866:efff:62c3:fffe");
            expect(result).toHaveProperty("token");
            expect(result.token).not.toEqual({});
            expect(result.token).not.toEqual(null);
            expect(result).toHaveProperty("expiresAt");
            expect(result).toHaveProperty("username", "test");
            expect(result).toHaveProperty("userId");
        });
        test("session should expire in 1 day", async () => {
            const userSessionMapper = {
                updateUserSession: jest.fn().mockImplementation(
                    (userId, token, expiresAt) => (
                        {
                            expiresAt,
                        }),
                ),
            };
            const userMapper = {
                getUser: jest.fn().mockResolvedValue({
                    userId: "userId",
                    username: "test",
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
                userMapper,
            });
            const result = await model.updateUserSession("userId", "127.0.0.1");
            expect(result).toHaveProperty("expiresAt");
            const timeDiff = new Date(result.expiresAt).getTime() - new Date().getTime();
            expect(timeDiff).toBeGreaterThan(3600 * 24 * 1000 - 5000); // decreasing 5 seconds for test time
        });
    });
    describe("\x1b[1m`deleteUserSession()`\x1b[0m I should:", () => {
        test("return an error with status 500 in case of mapper error", async () => {
            const userSessionMapper = {
                deleteUserSession: jest.fn().mockRejectedValue({
                    code: 500,
                    errmsg: "An error has occurred.",
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            await expect(model.deleteUserSession("userId")).rejects.toThrowError(new InternalServerError());
        });
        test("return a custom error with status in case of mapper custom error", async () => {
            const userSessionMapper = {
                deleteUserSession: jest.fn().mockRejectedValue(new NotImplemented()),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            await expect(model.deleteUserSession("userId", "tokenData", "127.0.0.1")).rejects.toThrowError(new NotImplemented());
        });
        test("delete an user session using userId, token and ipAddress", async () => {
            const userSessionMapper = {
                deleteUserSession: jest.fn().mockResolvedValue({
                    username: "test",
                    ipAddress: "127.0.0.1",
                    deletedAt: new Date(),
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            const result = await model.deleteUserSession("userId", "tokenData", "127.0.0.1");
            expect(result).toHaveProperty("username", "test");
            expect(result).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result).toHaveProperty("deletedAt");
        });
        test("not delete an user session using userId, token and ipAddress if is not found", async () => {
            const userSessionMapper = {
                deleteUserSession: jest.fn().mockResolvedValue(new NotFound()),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            await expect(model.deleteUserSession("userId", "tokenData", "127.0.0.1")).resolves.toThrowError(new NotFound());
        });
    });
    describe("\x1b[1m`verifyUserSession()`\x1b[0m I should:", () => {
        test("return an error with status 500 in case of mapper error", async () => {
            const userSessionMapper = {
                verifyUserSession: jest.fn().mockRejectedValue({
                    code: 500,
                    errmsg: "An error has occurred.",
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            await expect(model.verifyUserSession("userId", "tokenData", "127.0.0.1")).rejects.toThrowError(new InternalServerError());
        });
        test("return a custom error with status in case of mapper custom error", async () => {
            const userSessionMapper = {
                verifyUserSession: jest.fn().mockRejectedValue(new NotImplemented()),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            await expect(model.verifyUserSession("userId", "tokenData", "127.0.0.1")).rejects.toThrowError(new NotImplemented());
        });
        test("verify an user session using userId, token and ipAddress", async () => {
            const userSessionMapper = {
                verifyUserSession: jest.fn().mockResolvedValue({
                    userId: "userId",
                    username: "test",
                    ipAddress: "127.0.0.1",
                    token: "tokenData",
                    expiresAt: new Date(),
                }),
            };
            const model = new UserSessionModel({
                userSessionMapper,
            });
            const result = await model.verifyUserSession("userId", "tokenData", "127.0.0.1");
            expect(result).toHaveProperty("userId", "userId");
            expect(result).toHaveProperty("username", "test");
            expect(result).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result).toHaveProperty("token", "tokenData");
            expect(result).not.toHaveProperty("deletedAt");
            expect(result).toHaveProperty("expiresAt");
        });
    });
});