import "../config";

import {
    InternalServerError, Unauthorized, NotFound, UsernameOrEmailConflict,
} from "../../errors";

import UserModel from "../../components/user/UserModel";

/* globals test,expect,describe,jest */

describe("As an user of \x1b[1mUser Model\x1b[0m when using ", () => {
    describe("\x1b[1m`register()`\x1b[0m should:", () => {
        test("return an error with status 500 in case of syntax error", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockRejectedValue(new Error()),
                createUser: jest.fn().mockRejectedValue(new Error()),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockResolvedValue(),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue(),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
            });
            await expect(model.register("test", "test@test.com", "password", "organizationId")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 500 in case of mapper error", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockRejectedValue({
                    code: 500,
                    errmsg: "An error has occurred.",
                }),
                createUser: jest.fn().mockRejectedValue({
                    code: 500,
                    errmsg: "An error has occurred.",
                }),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockResolvedValue(),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue(),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
            });
            await expect(model.register("test", "test@test.com", "password", "organizationId")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 500 in case of userSessionModel error", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockResolvedValue(null),
                createUser: jest.fn().mockImplementation((username, email) => ({ username, email })),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockRejectedValue(new InternalServerError()),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue(),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
            });
            await expect(model.register("test", "test@test.com", "password", "organizationId")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 500 in case of organizationMapper error", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockResolvedValue(null),
                createUser: jest.fn().mockImplementation((username, email) => ({ username, email })),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockResolvedValue({}),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockRejectedValue(new InternalServerError()),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
            });
            await expect(model.register("test", "test@test.com", "password", "organizationId")).rejects.toThrowError(new InternalServerError());
        });
        test("create an user using username, email, password, ipAddress", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockResolvedValue(null),
                createUser: jest.fn().mockImplementation((userId, username, email) => ({ username, email })),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockImplementation((userId, ipAddress) => ({
                    userId, username: "test", ipAddress, token: "tokenData", expiresAt: new Date(),
                })),
            };
            const userInfoModel = {
                updateUserInfo: jest.fn().mockImplementation((userId, {
                    firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, timezone,
                }) => ({
                    userId, firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, temperatureUnitSymbol: "F", timezone, timezoneOffset: "+00:00",
                })),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue({}),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
                userInfoModel,
            });
            const result = await model.register("test", "test@test.com", "password", "organizationId", "127.0.0.1");
            expect(result).toHaveProperty("account");
            expect(result.account).toEqual({
                username: "test",
                email: "test@test.com",
            });
            expect(result).toHaveProperty("session");
            expect(result.session).toHaveProperty("userId");
            expect(result.session).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result.session).toHaveProperty("token");
            expect(result.session).toHaveProperty("expiresAt");
            expect(result.session).toHaveProperty("username", "test");
            expect(result).toHaveProperty("info");
            expect(result.info).toHaveProperty("temperatureUnit");
            expect(result.info).toHaveProperty("temperatureUnitSymbol");
            expect(result.info).toHaveProperty("timezone");
            expect(result.info).toHaveProperty("timezoneOffset");
        });
        test("when creating an user username and email should be lowercase", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockResolvedValue(null),
                createUser: jest.fn().mockImplementation((userId, username, email) => ({ username, email })),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockImplementation((userId, ipAddress) => ({
                    userId, username: "test", ipAddress, token: "tokenData", expiresAt: new Date(),
                })),
            };
            const userInfoModel = {
                updateUserInfo: jest.fn().mockImplementation((userId, {
                    firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, timezone,
                }) => ({
                    userId, firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, temperatureUnitSymbol: "F", timezone, timezoneOffset: "+00:00",
                })),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue({}),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
                userInfoModel,
            });
            const result = await model.register("TesT", "Test@teSt.com", "password", "organizationId", "127.0.0.1");
            expect(result).toHaveProperty("account");
            expect(result.account).toEqual({
                username: "test",
                email: "test@test.com",
            });
            expect(result).toHaveProperty("session");
            expect(result.session).toHaveProperty("userId");
            expect(result.session).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result.session).toHaveProperty("token");
            expect(result.session).toHaveProperty("expiresAt");
            expect(result.session).toHaveProperty("username", "test");
            expect(result).toHaveProperty("info");
            expect(result.info).toHaveProperty("temperatureUnit");
            expect(result.info).toHaveProperty("temperatureUnitSymbol");
            expect(result.info).toHaveProperty("timezone");
            expect(result.info).toHaveProperty("timezoneOffset");
        });
        test("when creating an user username should be trimmed", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockResolvedValue(null),
                createUser: jest.fn().mockImplementation((userId, username, email) => ({ username, email })),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockImplementation((userId, ipAddress) => ({
                    userId, username: "test", ipAddress, token: "tokenData", expiresAt: new Date(),
                })),
            };
            const userInfoModel = {
                updateUserInfo: jest.fn().mockImplementation((userId, {
                    firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, timezone,
                }) => ({
                    userId, firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, temperatureUnitSymbol: "F", timezone, timezoneOffset: "+00:00",
                })),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue({}),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
                userInfoModel,
            });
            const result = await model.register("test         ", "test@test.com", "password", "organizationId", "127.0.0.1");
            expect(result).toHaveProperty("account");
            expect(result.account).toEqual({
                username: "test",
                email: "test@test.com",
            });
            expect(result).toHaveProperty("session");
            expect(result.session).toHaveProperty("userId");
            expect(result.session).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result.session).toHaveProperty("token");
            expect(result.session).toHaveProperty("expiresAt");
            expect(result.session).toHaveProperty("username", "test");
            const result2 = await model.register("         test", "test@test.com", "password", "organizationId", "127.0.0.1");
            expect(result2).toHaveProperty("account");
            expect(result2.account).toEqual({
                username: "test",
                email: "test@test.com",
            });
            expect(result2).toHaveProperty("session");
            expect(result2.session).toHaveProperty("userId");
            expect(result2.session).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result2.session).toHaveProperty("token");
            expect(result2.session).toHaveProperty("expiresAt");
            expect(result2.session).toHaveProperty("username", "test");
            const result3 = await model.register("         test           ", "test@test.com", "password", "organizationId", "127.0.0.1");
            expect(result3).toHaveProperty("account");
            expect(result3.account).toEqual({
                username: "test",
                email: "test@test.com",
            });
            expect(result3).toHaveProperty("session");
            expect(result3.session).toHaveProperty("userId");
            expect(result3.session).toHaveProperty("ipAddress", "127.0.0.1");
            expect(result3.session).toHaveProperty("token");
            expect(result3.session).toHaveProperty("expiresAt");
            expect(result3.session).toHaveProperty("username", "test");
            expect(result).toHaveProperty("info");
            expect(result.info).toHaveProperty("temperatureUnit");
            expect(result.info).toHaveProperty("temperatureUnitSymbol");
            expect(result.info).toHaveProperty("timezone");
            expect(result.info).toHaveProperty("timezoneOffset");
        });
        test("return an error with status 409 in case of username or email conflict", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockResolvedValue(null),
                createUser: jest.fn().mockRejectedValue({
                    code: 11000,
                    errmsg: "E11000 duplicate key error index.",
                }),
            };
            const userSessionModel = {
                createUserSession: jest.fn().mockImplementation((username, ipAddress) => ({
                    username, ipAddress, token: "tokenData", expiresAt: new Date(),
                })),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue({}),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {
                userSessionModel,
            });
            await expect(model.register("test", "test@test.com", "password", "127.0.0.1")).rejects.toThrowError(new UsernameOrEmailConflict());
        });
        test("not create an user if username or email it's reserved", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockRejectedValue(new UsernameOrEmailConflict()),
            };
            const organizationMapper = {
                getOrganization: jest.fn().mockResolvedValue({}),
            };
            const model = new UserModel({
                userMapper,
                organizationMapper,
            }, {});
            await expect(model.register("test", "test@test.com", "password", "organizationId", "127.0.0.1")).rejects.toThrowError(new UsernameOrEmailConflict());
        });
    });
    describe("\x1b[1m`getUser()`\x1b[0m should:", () => {
        test("return an error with status 500 in case of syntax error", async () => {
            const model = new UserModel({}, {});
            await expect(model.getUser("userId")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 404 if user is not found", async () => {
            const userMapper = {
                getUser: jest.fn().mockRejectedValue(new NotFound()),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            await expect(model.getUser("userId")).rejects.toThrowError(new NotFound());
        });
        test("return an error with status 500 in case of user mapper error", async () => {
            const userMapper = {
                getUser: jest.fn().mockRejectedValue(new InternalServerError()),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            await expect(model.getUser("userId")).rejects.toThrowError(new InternalServerError());
        });
        test("return the user data", async () => {
            const userMapper = {
                getUser: jest.fn().mockResolvedValue({
                    firstName: "John",
                    lastName: "Doe",
                }),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            const userData = await model.getUser("userId", "token");
            await expect(userData).toHaveProperty("firstName", "John");
            await expect(userData).toHaveProperty("lastName", "Doe");
        });
    });
    describe("\x1b[1m`verifyReservedUsernameOrEmail()`\x1b[0m should:", () => {
        test("return an error with status 500 in case of mapper error", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockRejectedValue({
                    code: 500,
                    errmsg: "An error has occurred.",
                }),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            await expect(model.verifyReservedUsernameOrEmail("username", "email")).rejects.toThrowError(new InternalServerError());
        });
        test("return a reservation for an username or email", async () => {
            const userMapper = {
                verifyReservedUsernameOrEmail: jest.fn().mockResolvedValue({
                    email: "test@test.com",
                    usernameLoginHash: "usernameLoginHash",
                }),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            const userData = await model.verifyReservedUsernameOrEmail("test", "test@test.com");
            await expect(userData).toHaveProperty("email", "test@test.com");
            await expect(userData).toHaveProperty("usernameLoginHash", "usernameLoginHash");
        });
    });
    describe("\x1b[1m`login()`\x1b[0m should:", () => {
        test("return an error with status 500 in case of mapper error", async () => {
            const userMapper = {
                getUserByUsername: jest.fn().mockRejectedValue(new Error()),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            await expect(model.login("username", "password", "ipAddress")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 401 if we don't have that username", async () => {
            const userMapper = {
                getUserByUsername: jest.fn().mockRejectedValue(new NotFound()),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            await expect(model.login("username", "password", "ipAddress")).rejects.toThrowError(new Unauthorized());
        });
        test("return an error with status 500 in case of bcrypt error", async () => {
            const userMapper = {
                getUserByUsername: jest.fn().mockResolvedValue({}),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockResolvedValue({
                    username: "example",
                    token: "tokenData",
                    expiresAt: new Date(),
                    ipAddress: "::ffff:127.0.0.1",
                }),
            };
            const model = new UserModel({
                userMapper,
            }, {
                userSessionModel,
            });
            await expect(model.login("username", "password", "ipAddress")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 500 in case of sessions mapper error", async () => {
            const userMapper = {
                getUserByUsername: jest.fn().mockResolvedValue({
                    passwordLoginHash: "$2a$12$Udkm/jKNF0L2SCzfj5PueezcCmurNiE0wMmchZcv.eogU1DdAsL06",
                }),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockRejectedValue(new Error()),
            };
            const model = new UserModel({
                userMapper,
            }, {
                userSessionModel,
            });
            await expect(model.login("username", "password", "ipAddress")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 500 in case of sessions model error", async () => {
            const userMapper = {
                getUserByUsername: jest.fn().mockResolvedValue({
                    passwordLoginHash: "$2a$12$Udkm/jKNF0L2SCzfj5PueezcCmurNiE0wMmchZcv.eogU1DdAsL06",
                }),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockRejectedValue(new InternalServerError()),
            };
            const model = new UserModel({
                userMapper,
            }, {
                userSessionModel,
            });
            await expect(model.login("username", "password", "ipAddress")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error if password hash is not equal to the account hash", async () => {
            const userMapper = {
                getUserByUsername: jest.fn().mockResolvedValue({
                    passwordLoginHash: "$2a$12$Udkm/jKNF0L2SCzfj5PueezcCmurNiE0wMmchZcv.eogU1DdAsL06",
                }),
            };
            const model = new UserModel({
                userMapper,
            }, {});
            await expect(model.login("username", "", "ipAddress")).rejects.toThrowError(new Unauthorized());
        });
        test("return the created session if login succeeded", async () => {
            const userMapper = {
                getUserByUsername: jest.fn().mockResolvedValue({
                    passwordLoginHash: "$2a$12$Udkm/jKNF0L2SCzfj5PueezcCmurNiE0wMmchZcv.eogU1DdAsL06",
                }),
            };
            const userSessionModel = {
                updateUserSession: jest.fn().mockResolvedValue({
                    username: "example",
                    token: "tokenData",
                    expiresAt: new Date(),
                    ipAddress: "::ffff:127.0.0.1",
                }),
            };
            const model = new UserModel({
                userMapper,
            }, {
                userSessionModel,
            });
            const logout = await model.login("username", "password", "ipAddress");
            await expect(logout).toHaveProperty("username", "example");
            await expect(logout).toHaveProperty("token");
            await expect(logout).toHaveProperty("expiresAt");
            await expect(logout).toHaveProperty("ipAddress", "::ffff:127.0.0.1");
        });
    });
    describe("\x1b[1m`logout()`\x1b[0m should:", () => {
        test("return an error with status 500 in case of model error", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue({}),
                deleteUserSession: jest.fn().mockRejectedValue({}),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            await expect(model.logout("username", "token")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 500 in case of sessions mapper error", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(new InternalServerError()),
                deleteUserSession: jest.fn().mockRejectedValue(new InternalServerError()),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            await expect(model.logout("username", "token")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 401 if not authorized", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(new Unauthorized()),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            await expect(model.logout("username", "token")).rejects.toThrowError(new Unauthorized());
        });
        test("return an error with status 404 if session couldn't be found to delete", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({}),
                deleteUserSession: jest.fn().mockRejectedValue(new NotFound()),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            await expect(model.logout("username", "token")).rejects.toThrowError(new NotFound());
        });
        test("return the deleted session if logout succeeded", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({
                    username: "example",
                    token: "tokenData",
                    expiresAt: new Date(),
                }),
                deleteUserSession: jest.fn().mockResolvedValue({
                    username: "example",
                    ipAddress: "::ffff:127.0.0.1",
                    deletedAt: new Date(),
                }),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            const logout = await model.logout("username", "token");
            await expect(logout).toHaveProperty("username", "example");
            await expect(logout).toHaveProperty("ipAddress", "::ffff:127.0.0.1");
            await expect(logout).toHaveProperty("deletedAt");
            await expect(logout).not.toHaveProperty("token");
            await expect(logout).not.toHaveProperty("expiresAtAt");
        });
    });
    describe("\x1b[1m`verify()`\x1b[0m should:", () => {
        test("return an error with status 500 in case of model error", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue({}),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            await expect(model.verify("username", "token")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 500 in case of sessions mapper error", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(new InternalServerError()),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            await expect(model.verify("username", "token")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 401 if not authorized", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(new Unauthorized()),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            await expect(model.verify("username", "token")).rejects.toThrowError(new Unauthorized());
        });
        test("return the user session if session is valid", async () => {
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({
                    username: "example",
                    token: "tokenData",
                    expiresAt: new Date(),
                }),
            };
            const model = new UserModel({}, {
                userSessionModel,
            });
            const userData = await model.verify("username", "token");
            await expect(userData).toHaveProperty("username", "example");
            await expect(userData).toHaveProperty("token", "tokenData");
            await expect(userData).toHaveProperty("expiresAt");
        });
    });
});