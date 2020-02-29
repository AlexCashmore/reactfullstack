import crypto from "crypto";
import bcrypt from "bcrypt";

import uuidv4 from "uuid/v4";

import { temperatureConfig, timezonesConfig } from "../../core/entities/config";

import {
    NotFound, Unauthorized, UsernameOrEmailConflict, InternalServerError, AppError,
} from "../../errors";

class UserModel {
    constructor({
        userMapper,
        organizationMapper,
    }, {
        userSessionModel,
        userInfoModel,
        userRecoverModel,
    }) {
        Object.defineProperty(this, "userMapper", {
            enumerable: true,
            configurable: false,
            value: userMapper,
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
        Object.defineProperty(this, "userRecoverModel", {
            enumerable: true,
            configurable: false,
            value: userRecoverModel,
        });
        Object.defineProperty(this, "organizationMapper", {
            enumerable: true,
            configurable: false,
            value: organizationMapper,
        });
    }

    async register(newUsername, newEmail, newPassword, organizationId, ipAddress) {
        try {
            // Check organization and permissions to create the user
            await this.organizationMapper.getOrganization(organizationId);
            // TODO: check permissions of current user to create a new users on the organizationId requested

            const username = newUsername.toLowerCase().trim();
            const email = newEmail.toLowerCase();
            const usernameLogin = crypto.createHash("sha256");
            usernameLogin.update(username);

            const usernameLoginHash = usernameLogin.digest("base64");
            const passwordLoginHash = await bcrypt.hash(newPassword, 12);

            await this.userMapper.verifyReservedUsernameOrEmail(usernameLoginHash, email);

            const userId = await uuidv4(); // generating an uuidv4 userId
            const userAccount = await this.userMapper.createUser(userId, username, email, usernameLoginHash, passwordLoginHash, organizationId, ipAddress);
            const userSession = await this.userSessionModel.updateUserSession(userId, ipAddress);

            const userInfo = await this.userInfoModel.updateUserInfo(userId, {
                nickname: username, temperatureUnit: temperatureConfig.defaultTemperatureUnit, timezone: timezonesConfig.defaultTimezone,
            });

            return {
                account: userAccount,
                session: userSession,
                info: userInfo,
            };
        } catch (e) {
            if(e.code === 11000) {
                throw new UsernameOrEmailConflict();
            }
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async verifyReservedUsernameOrEmail(username, email) {
        try {
            const usernameLogin = crypto.createHash("sha256");
            usernameLogin.update(username);
            const usernameLoginHash = usernameLogin.digest("base64");
            return await this.userMapper.verifyReservedUsernameOrEmail(usernameLoginHash, email);
        } catch (e) {
            throw new InternalServerError(e);
        }
    }

    async login(username, password, ipAddress) {
        let match = null;
        let user = {};
        try {
            const usernameLogin = crypto.createHash("sha256");
            usernameLogin.update(username);
            const usernameLoginHash = usernameLogin.digest("base64");
            user = await this.userMapper.getUserByUsername(usernameLoginHash);
            match = await bcrypt.compare(password, user.passwordLoginHash);
        } catch (e) {
            if(e instanceof NotFound) {
                throw new Unauthorized();
            }
            throw new InternalServerError(e);
        }
        if(!match) {
            throw new Unauthorized();
        }
        try {
            return await this.userSessionModel.updateUserSession(user.userId, ipAddress);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async logout(userId, token, ipAddress) {
        try {
            await this.userSessionModel.verifyUserSession(userId, token, ipAddress);
            return await this.userSessionModel.deleteUserSession(userId, token, ipAddress);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async verify(userId, token, ipAddress) {
        try {
            return await this.userSessionModel.verifyUserSession(userId, token, ipAddress);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getUser(userId) {
        try {
            return await this.userMapper.getUser(userId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    // createRecover(email, ipAddress) {
    //     return new Promise((resolve, reject) => {
    //         this.userRecoverMapperInstance.createUserRecover(email, ipAddress)
    //             .then((userRecover) => {
    //                 this.emailTransporterModelInstance.sendEmailUserRecover(userRecover.username, userRecover.email, userRecover.token)
    //                     .then(() => {
    //                         // Cleaning the userRecover from secure data
    //                         userRecover = {
    //                             email: userRecover.email,
    //                             ipAddress: userRecover.ipAddress,
    //                         };
    //
    //                         resolve(userRecover);
    //                     }, reject);
    //             })
    //             .catch((result) => {
    //                 if(!result) {
    //                     reject({
    //                         reason: "Unauthorized",
    //                         status: 401,
    //                     });
    //                 } else {
    //                     reject({
    //                         reason: "Internal Server Error",
    //                         status: 500,
    //                     });
    //                 }
    //             });
    //     });
    // }
    //
    // verifyRecover(email, token) {
    //     return new Promise((resolve, reject) => {
    //         this.userRecoverMapperInstance.verifyUserRecover(email, token)
    //             .then((userRecover) => {
    //                 resolve(userRecover);
    //             })
    //             .catch((result) => {
    //                 if(!result) {
    //                     reject({
    //                         reason: "Unauthorized",
    //                         status: 401,
    //                     });
    //                 } else {
    //                     reject({
    //                         reason: "Internal Server Error",
    //                         status: 500,
    //                     });
    //                 }
    //             });
    //     });
    // }
    //
    // deleteRecover(email, token, password) {
    //     return new Promise((resolve, reject) => {
    //         this.userRecoverMapperInstance.deleteUserRecover(email, token, password)
    //             .then((userRecover) => {
    //                 resolve(userRecover);
    //             })
    //             .catch((result) => {
    //                 if(!result) {
    //                     reject({
    //                         reason: "Unauthorized",
    //                         status: 401,
    //                     });
    //                 } else {
    //                     reject({
    //                         reason: "Internal Server Error",
    //                         status: 500,
    //                     });
    //                 }
    //             });
    //     });
    // }
}

export default UserModel;