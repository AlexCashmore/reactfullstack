import "../config";

import { Unauthorized, InternalServerError, AppError } from "../../errors";

import UserController from "../../components/user/UserController";

/* globals test,expect,describe,jest */

function configExpressMocks() {
    const res = {
        set: jest.fn(),
        status: jest.fn(),
        json: jest.fn(),
    };
    res.set.mockImplementation(() => res);
    res.status.mockImplementation(() => res);
    res.json.mockImplementation(() => res);
    return res;
}

describe("As an user of \x1b[1mUser Controller\x1b[0m when using ", () => {
    describe("\x1b[1m`register()`\x1b[0m I should:", () => {
        test("return an error with status 400 in case of validation error", async (done) => {
            const validationErrors = {
                username: ["Username can't be blank", "Username is too short (minimum is 3 characters)", "Username is invalid"],
                email: ["Email can't be blank", "Email is too short (minimum is 5 characters)", "Email is not a valid email address"],
                password: ["Password can't be blank", "Password is too short (minimum is 6 characters)", "Password is invalid"],
                confirmPassword: ["Confirm password can't be blank"],
                organizationId: ["Organization id can't be blank", "Organization id is invalid"],
                userId: ["User id can't be blank", "User id is invalid"],
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    organizationId: "",
                    userId: "",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the username has a validation error", async (done) => {
            const validationErrors = {
                username: ["Username can't be blank", "Username is too short (minimum is 3 characters)", "Username is invalid"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "",
                    email: "example@domain.com",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the email has a validation error", async (done) => {
            const validationErrors = {
                email: ["Email can't be blank", "Email is too short (minimum is 5 characters)", "Email is not a valid email address"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "example",
                    email: "",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the password has a validation error", async (done) => {
            const validationErrors = {
                password: ["Password can't be blank", "Password is too short (minimum is 6 characters)", "Password is invalid"],
                confirmPassword: ["Confirm password is not equal to password"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    password: "",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the password is not equal to confirmPassword", async (done) => {
            const validationErrors = {
                confirmPassword: ["Confirm password can't be blank", "Confirm password is not equal to password"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    password: "Pass1234",
                    confirmPassword: "",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the organizationId has a validation error", async (done) => {
            const validationErrors = {
                organizationId: ["Organization id can't be blank", "Organization id is invalid"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    organizationId: "",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the userId has a validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the token has a validation error", async (done) => {
            const validationErrors = {
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                register: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 500 if model has an error", async (done) => {
            const error = new AppError();
            const model = {
                register: jest.fn().mockRejectedValue(error),
            };
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(error),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model, userSessionModel);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(error.status);
            expect(response.json).toHaveBeenCalledWith({
                status: error.status,
                message: error.message,
                details: error.details,
            });
            done();
        });
        test("return an error with status 500 if controller has an error", async (done) => {
            const error = new Error();
            const errorResponse = new InternalServerError();
            const model = {
                register: jest.fn().mockRejectedValue(error),
            };
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(error),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model, userSessionModel);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an object with account info with status 201 if registration is a success", async (done) => {
            const account = {
                account: {},
                session: {},
            };
            const model = {
                register: jest.fn().mockResolvedValue({
                    account,
                }),
            };
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "example",
                    email: "example@domain.com",
                    password: "Pass1234",
                    confirmPassword: "Pass1234",
                    organizationId: "00000000-0000-4000-A000-000000000000",
                    userId: "00000000-0000-4000-A000-000000000000",
                    token: "$2a$12$ibUV.ec1hKeRYwO3gSyRAuXBacfeDqL42pTf6xVhmO5WrfZnWVbDq",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model, userSessionModel);
            const response = await controller.register(req, res);
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith({ account });
            done();
        });
    });
    describe("\x1b[1m`login()`\x1b[0m I should:", () => {
        test("return an error with status 400 in case of validation error", async (done) => {
            const validationErrors = {
                username: ["Username can't be blank", "Username is too short (minimum is 3 characters)", "Username is invalid"],
                password: ["Password can't be blank", "Password is too short (minimum is 6 characters)", "Password is invalid"],
            };
            const model = {
                login: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "",
                    password: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.login(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if username has a validation error", async (done) => {
            const validationErrors = {
                username: ["Username can't be blank", "Username is too short (minimum is 3 characters)", "Username is invalid"],
            };
            const model = {
                login: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "",
                    password: "Pass123@",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.login(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if password has a validation error", async (done) => {
            const validationErrors = {
                password: ["Password can't be blank", "Password is too short (minimum is 6 characters)", "Password is invalid"],
            };
            const model = {
                login: jest.fn().mockResolvedValue({}),
            };
            const req = {
                body: {
                    username: "test",
                    password: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.login(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 500 if model has an error", async (done) => {
            const error = new AppError();
            const model = {
                login: jest.fn().mockRejectedValue(error),
            };
            const req = {
                body: {
                    username: "test",
                    password: "Pass123@",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.login(req, res);
            expect(response.status).toHaveBeenCalledWith(error.status);
            expect(response.json).toHaveBeenCalledWith({
                status: error.status,
                message: error.message,
                details: error.details,
            });
            done();
        });
        test("return an error with status 500 if controller has an error", async (done) => {
            const error = new Error();
            const errorResponse = new InternalServerError();
            const model = {
                login: jest.fn().mockRejectedValue(error),
            };
            const req = {
                body: {
                    username: "test",
                    password: "Pass123@",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.login(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an error with status 401 if username or password is not valid", async (done) => {
            const errorResponse = new Unauthorized();
            const model = {
                login: jest.fn().mockRejectedValue(errorResponse),
            };
            const req = {
                body: {
                    username: "test",
                    password: "Pass123@",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.login(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an object with account info with status 200 if login is a success", async (done) => {
            const info = {
                username: "test",
                ipAddress: "::ffff:127.0.0.1",
                token: "tokenData",
                expiresAt: new Date(),
            };
            const model = {
                login: jest.fn().mockResolvedValue({
                    info,
                }),
            };
            const req = {
                body: {
                    username: "test",
                    password: "Pass123@",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.login(req, res);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ info });
            done();
        });
    });
    describe("\x1b[1m`logout()`\x1b[0m I should:", () => {
        test("return an error with status 400 in case of validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                logout: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.logout(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the userId has a validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
            };
            const model = {
                logout: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.logout(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the token has a validation error", async (done) => {
            const validationErrors = {
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                logout: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.logout(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 500 if model has an error", async (done) => {
            const error = new AppError();
            const model = {
                logout: jest.fn().mockRejectedValue(error),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.logout(req, res);
            expect(response.status).toHaveBeenCalledWith(error.status);
            expect(response.json).toHaveBeenCalledWith({
                status: error.status,
                message: error.message,
                details: error.details,
            });
            done();
        });
        test("return an error with status 500 if controller has an error", async (done) => {
            const error = new Error();
            const errorResponse = new InternalServerError();
            const model = {
                logout: jest.fn().mockRejectedValue(error),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.logout(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an error with status 401 if token is not valid", async (done) => {
            const errorResponse = new Unauthorized();
            const model = {
                logout: jest.fn().mockRejectedValue(errorResponse),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.logout(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an object with logout info with status 200 if session is found", async (done) => {
            const info = {
                username: "example",
                ipAddress: "::ffff:127.0.0.1",
                deletedAt: new Date(),
            };
            const model = {
                logout: jest.fn().mockResolvedValue({
                    info,
                }),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.logout(req, res);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ info });
            done();
        });
    });
    describe("\x1b[1m`verify()`\x1b[0m I should:", () => {
        test("return an error with status 400 in case of validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                verify: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.verify(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the username has a validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
            };
            const model = {
                verify: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.verify(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the token has a validation error", async (done) => {
            const validationErrors = {
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                verify: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.verify(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 500 if model has an error", async (done) => {
            const error = new AppError();
            const model = {
                verify: jest.fn().mockRejectedValue(error),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.verify(req, res);
            expect(response.status).toHaveBeenCalledWith(error.status);
            expect(response.json).toHaveBeenCalledWith({
                status: error.status,
                message: error.message,
                details: error.details,
            });
            done();
        });
        test("return an error with status 500 if controller has an error", async (done) => {
            const error = new Error();
            const errorResponse = new InternalServerError();
            const model = {
                verify: jest.fn().mockRejectedValue(error),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.verify(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an error with status 401 if token is not authorized", async (done) => {
            const errorResponse = new Unauthorized();
            const model = {
                verify: jest.fn().mockRejectedValue(errorResponse),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.verify(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an object with account info with status 200 if user data is found", async (done) => {
            const info = {
                username: "example",
                token: "tokenData",
                expiresAt: new Date(),
            };
            const model = {
                verify: jest.fn().mockResolvedValue({
                    info,
                }),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.verify(req, res);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ info });
            done();
        });
    });
    describe("\x1b[1m`getUser()`\x1b[0m I should:", () => {
        test("return an error with status 400 in case of validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                getUser: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.getUser(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the username has a validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
            };
            const model = {
                getUser: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.getUser(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the token has a validation error", async (done) => {
            const validationErrors = {
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                getUser: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model);
            const response = await controller.getUser(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 500 if controller has an error", async (done) => {
            const errorResponse = new InternalServerError();
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, null);
            const response = await controller.getUser(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an error with status 401 if token is not authorized", async (done) => {
            const errorResponse = new Unauthorized();
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(errorResponse),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, userSessionModel);
            const response = await controller.getUser(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });

        test("return an error with status 500 if model has an error", async (done) => {
            const error = new AppError();
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({}),
            };
            const model = {
                getUser: jest.fn().mockRejectedValue(error),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model, userSessionModel);
            const response = await controller.getUser(req, res);
            expect(response.status).toHaveBeenCalledWith(error.status);
            expect(response.json).toHaveBeenCalledWith({
                status: error.status,
                message: error.message,
                details: error.details,
            });
            done();
        });
        test("return an object with account info with status 200 if user data is found", async (done) => {
            const info = {
                firstName: {},
                lastName: {},
            };
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({}),
            };
            const model = {
                getUser: jest.fn().mockResolvedValue({
                    info,
                }),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(model, userSessionModel);
            const response = await controller.getUser(req, res);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ info });
            done();
        });
    });
    describe("\x1b[1m`getUserInfo()`\x1b[0m I should:", () => {
        test("return an error with status 400 in case of validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                getUser: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, null, model);
            const response = await controller.getUserInfo(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the username has a validation error", async (done) => {
            const validationErrors = {
                userId: ["User id can't be blank", "User id is invalid"],
            };
            const model = {
                getUser: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, null, model);
            const response = await controller.getUserInfo(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 400 if the token has a validation error", async (done) => {
            const validationErrors = {
                token: ["Token can't be blank", "Token is too short (minimum is 57 characters)"],
            };
            const model = {
                getUser: jest.fn().mockResolvedValue({}),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, null, model);
            const response = await controller.getUserInfo(req, res);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith(validationErrors);
            done();
        });
        test("return an error with status 500 if controller has an error", async (done) => {
            const errorResponse = new InternalServerError();
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, null, null);
            const response = await controller.getUserInfo(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });
        test("return an error with status 401 if token is not authorized", async (done) => {
            const errorResponse = new Unauthorized();
            const userSessionModel = {
                verifyUserSession: jest.fn().mockRejectedValue(errorResponse),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, userSessionModel, null);
            const response = await controller.getUserInfo(req, res);
            expect(response.status).toHaveBeenCalledWith(errorResponse.status);
            expect(response.json).toHaveBeenCalledWith({
                status: errorResponse.status,
                message: errorResponse.message,
                details: errorResponse.details,
            });
            done();
        });

        test("return an error with status 500 if model has an error", async (done) => {
            const error = new AppError();
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({}),
            };
            const model = {
                getUserInfo: jest.fn().mockRejectedValue(error),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, userSessionModel, model);
            const response = await controller.getUserInfo(req, res);
            expect(response.status).toHaveBeenCalledWith(error.status);
            expect(response.json).toHaveBeenCalledWith({
                status: error.status,
                message: error.message,
                details: error.details,
            });
            done();
        });
        test("return an object with account info with status 200 if user data is found", async (done) => {
            const info = {
                firstName: {},
                lastName: {},
            };
            const userSessionModel = {
                verifyUserSession: jest.fn().mockResolvedValue({}),
            };
            const model = {
                getUserInfo: jest.fn().mockResolvedValue({
                    info,
                }),
            };
            const req = {
                params: {
                    userId: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
                    token: "$2a$12$fObcjnurK4u5K/Xd2ECJDOyA//ej8YOthmwYBCCEjBWGuYch0xZoy",
                },
                clientIp: "127.0.0.1",
            };
            const res = configExpressMocks();
            const controller = new UserController(null, userSessionModel, model);
            const response = await controller.getUserInfo(req, res);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ info });
            done();
        });
    });
    describe("\x1b[1m`createRecover()`\x1b[0m I should:", () => {

    });
    describe("\x1b[1m`deleteRecover()`\x1b[0m I should:", () => {

    });
});