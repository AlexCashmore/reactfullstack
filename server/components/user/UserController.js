import moment from "moment-timezone";
import validate from "../../../utils/customValidate";

import { temperatureConfig } from "../../core/entities/config";

import {
    InternalServerError, AppError,
} from "../../errors";

class UserController {
    constructor(userModel, userSessionModel, userInfoModel) {
        Object.defineProperty(this, "userModel", {
            enumerable: true,
            configurable: false,
            value: userModel,
        });
        Object.defineProperty(this, "userSessionModel", {
            enumerable: true,
            configurable: false,
            value: userSessionModel,
        });
        Object.defineProperty(this, "userInfoModel", {
            enumerable: true,
            configurable: false,
            value: userInfoModel,
        });
    }

    get register() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    body: validate(req.body, this.constructor.constraints.register.body),
                };
                if(validationErrors.body) {
                    return res.status(400).json(validationErrors.body);
                }
                const {
                    username, email, password, organizationId, userId, token,
                } = req.body;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const account = await this.userModel.register(username, email, password, organizationId, clientIp);
                return res.status(201).json(account);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get login() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    body: validate(req.body, this.constructor.constraints.login.body),
                };
                if(validationErrors.body) {
                    return res.status(400).json(validationErrors.body);
                }
                const {
                    username, password,
                } = req.body;
                const {
                    clientIp,
                } = req;
                const login = await this.userModel.login(username, password, clientIp);
                return res.status(200).json(login);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get logout() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.logout.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                const logout = await this.userModel.logout(userId, token, clientIp);
                return res.status(200).json(logout);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get verify() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.verify.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                const verify = await this.userModel.verify(userId, token, clientIp);
                return res.status(200).json(verify);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get getUser() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.getUser.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const user = await this.userModel.getUser(userId);
                return res.status(200).json(user);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get getUserInfo() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.getUserInfo.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const user = await this.userInfoModel.getUserInfo(userId);
                return res.status(200).json(user);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get updateUserInfo() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    body: validate(req.body, this.constructor.constraints.updateUserInfo.body),
                    params: validate(req.params, this.constructor.constraints.updateUserInfo.params),
                };
                if(validationErrors.body) {
                    return res.status(400).json(validationErrors.body);
                }
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, timezone,
                } = req.body;
                const {
                    userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const account = await this.userInfoModel.updateUserInfo(userId, {
                    firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, timezone,
                });
                return res.status(201).json(account);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    // get createRecover() {
    //     return (req, res) => {
    //         const validationErrors = {
    //             body: validate(req.body, this.constructor.constraints.createRecover.body),
    //         };
    //
    //         if(validationErrors.body) {
    //             return Promise.resolve(res.status(400).json(validationErrors.body));
    //         }
    //
    //         return this.userModelInstance.createRecover(req.body.email, req.clientIp)
    //             .then(userRecover => res.status(200).json(userRecover))
    //             .catch((err) => {
    //                 if(err && err.reason && err.status) {
    //                     return res.status(err.status).json(err);
    //                 }
    //
    //                 return res.status(500).json({
    //                     reason: "Internal Server Error",
    //                     status: 500,
    //                 }).end();
    //             });
    //     };
    // }
    //
    // get deleteRecover() {
    //     return (req, res) => {
    //         const validationErrors = {
    //             params: validate(req.params, this.constructor.constraints.deleteRecover.params),
    //         };
    //
    //         if(validationErrors.params) {
    //             return Promise.resolve(res.status(400).json(validationErrors.params));
    //         }
    //
    //         return this.userModelInstance.deleteRecover(req.params.email, req.params.token, req.params.password, req.clientIp)
    //             .then(userRecover => res.status(200).json(userRecover))
    //             .catch((err) => {
    //                 if(err && err.reason && err.status) {
    //                     return res.status(err.status).json(err);
    //                 }
    //
    //                 return res.status(500).json({
    //                     reason: "Internal Server Error",
    //                     status: 500,
    //                 }).end();
    //             });
    //     };
    // }
}

UserController.constraints = {
    register: {
        body: {
            username: {
                presence: true,
                isString: true,
                length: {
                    minimum: 3,
                    maximum: 32,
                },
                format: {
                    pattern: "^[a-zA-Z0-9][a-zA-Z0-9_.]+[a-zA-Z0-9]$",
                },
            },
            email: {
                presence: true,
                isString: true,
                length: {
                    minimum: 5,
                    maximum: 64,
                },
                email: {
                    message: "is not a valid email address",
                },
            },
            password: {
                presence: true,
                isString: true,
                length: {
                    minimum: 6,
                    maximum: 32,
                },
                format: {
                    pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$",
                },
            },
            confirmPassword: {
                presence: true,
                isString: true,
                equality: "password",
            },
            organizationId: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            userId: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            token: {
                presence: true,
                isString: true,
                length: {
                    minimum: 57,
                },
            },
        },
    },
    login: {
        body: {
            username: {
                presence: true,
                isString: true,
                length: {
                    minimum: 3,
                    maximum: 32,
                },
                format: {
                    pattern: "^[a-zA-Z0-9][a-zA-Z0-9_.]+[a-zA-Z0-9]$",
                },
            },
            password: {
                presence: true,
                isString: true,
                length: {
                    minimum: 6,
                    maximum: 32,
                },
                format: {
                    pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$",
                },
            },
        },
    },
    logout: {
        params: {
            userId: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            token: {
                presence: true,
                isString: true,
                length: {
                    minimum: 57,
                },
            },
        },
    },
    verify: {
        params: {
            userId: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            token: {
                presence: true,
                isString: true,
                length: {
                    minimum: 57,
                },
            },
        },
    },
    getUser: {
        params: {
            userId: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            token: {
                presence: true,
                isString: true,
                length: {
                    minimum: 57,
                },
            },
        },
    },
    getUserInfo: {
        params: {
            userId: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            token: {
                presence: true,
                isString: true,
                length: {
                    minimum: 57,
                },
            },
        },
    },
    updateUserInfo: {
        body: {
            firstName: {
                isString: true,
                length: {
                    minimum: 3,
                    maximum: 100,
                },
            },
            lastName: {
                isString: true,
                length: {
                    minimum: 3,
                    maximum: 100,
                },
            },
            nickname: {
                presence: true,
                isString: true,
                length: {
                    minimum: 3,
                    maximum: 100,
                },
            },
            phone: {
                isString: true,
                length: {
                    minimum: 0,
                    maximum: 100,
                },
            },
            street: {
                isString: true,
                length: {
                    minimum: 0,
                    maximum: 100,
                },
            },
            city: {
                isString: true,
                length: {
                    minimum: 0,
                    maximum: 100,
                },
            },
            state: {
                isString: true,
                length: {
                    minimum: 0,
                    maximum: 100,
                },
            },
            region: {
                isString: true,
                length: {
                    minimum: 0,
                    maximum: 100,
                },
            },
            postCode: {
                isString: true,
                length: {
                    minimum: 0,
                    maximum: 100,
                },
            },
            country: {
                isString: true,
                length: {
                    minimum: 0,
                    maximum: 100,
                },
            },
            temperatureUnit: {
                presence: true,
                isString: true,
                inclusion: {
                    within: temperatureConfig.types,
                    message: "is invalid",
                },
            },
            timezone: {
                presence: true,
                isString: true,
                inclusion: {
                    within: moment.tz.names(),
                    message: "is not a valid timezone",
                },
            },
        },
        params: {
            userId: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            token: {
                presence: true,
                isString: true,
                length: {
                    minimum: 57,
                },
            },
        },
    },
    // createRecover: {
    //     body: {
    //         email: {
    //             presence: true,
    //             isString: true,
    //             length: {
    //                 minimum: 5,
    //                 maximum: 64,
    //             },
    //             email: {
    //                 message: "is not a valid email address",
    //             },
    //         },
    //     },
    // },
    // deleteRecover: {
    //     params: {
    //         email: {
    //             presence: true,
    //             isString: true,
    //             length: {
    //                 minimum: 5,
    //                 maximum: 64,
    //             },
    //             email: {
    //                 message: "is not a valid email address",
    //             },
    //         },
    //         token: {
    //             presence: true,
    //             isString: true,
    //             length: {
    //                 minimum: 57,
    //             },
    //         },
    //         password: {
    //             presence: true,
    //             isString: true,
    //             length: {
    //                 minimum: 6,
    //                 maximum: 32,
    //             },
    //             format: {
    //                 pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$",
    //             },
    //         },
    //         confirmPassword: {
    //             presence: true,
    //             isString: true,
    //             equality: "password",
    //         },
    //     },
    // },

};

UserController.specs = {
    "/user": {
        PUT: {
            method: "register",
            description: "This endpoint will create a new account.",
            constraints: UserController.constraints.register,
        },
    },
    "/user/:userId/:token": {
        GET: {
            method: "getUser",
            description: "This endpoint will return the basic account information.",
            constraints: UserController.constraints.getUser,
        },
    },
    "/user/info/:userId/:token": {
        GET: {
            method: "getUserInfo",
            description: "This endpoint will return all information for an account.",
            constraints: UserController.constraints.getUserInfo,
        },
        PUT: {
            method: "updateUserInfo",
            description: "This endpoint will update basic info for an account.",
            constraints: UserController.constraints.updateUserInfo,
        },
    },
    "/user/session": {
        POST: {
            method: "login",
            description: "This endpoint will create an authorized session for the user.",
            constraints: UserController.constraints.login,
        },
    },
    "/user/session/:userId/:token": {
        DELETE: {
            method: "logout",
            description: "This endpoint will delete the session of the user.",
            constraints: UserController.constraints.logout,
        },
        GET: {
            method: "verify",
            description: "This endpoint will verify if the session is valid.",
            constraints: UserController.constraints.verify,
        },
    },
    // "/user/recover": {
    //     POST: {
    //         method: "createRecover",
    //         description: "This endpoint will send an email with recovery link for the user.",
    //         constraints: UserController.constraints.createRecover,
    //     },
    //     DELETE: {
    //         method: "deleteRecover",
    //         description: "This endpoint will delete the recovery data for the user and change the password.",
    //         constraints: UserController.constraints.deleteRecover,
    //     },
    // },
};

export default UserController;