import bcrypt from "bcrypt";
import { Address6 } from "ip-address";
import { InternalServerError, AppError } from "../../errors";

class UserSessionModel {
    constructor({
        userSessionMapper,
        userMapper,
    }) {
        Object.defineProperty(this, "userSessionMapper", {
            enumerable: true,
            configurable: false,
            value: userSessionMapper,
        });
        Object.defineProperty(this, "userMapper", {
            enumerable: true,
            configurable: false,
            value: userMapper,
        });
    }

    async updateUserSession(userId, clientIp) {
        try {
            const now = new Date();
            const expiresAt = new Date(now.getTime() + 86400 * 1000); // expiration date for the token, in 1 day
            const user = await this.userMapper.getUser(userId);
            const token = await bcrypt.hash(user.username + now.getTime() + Math.random(), 12);
            const ipAddress = new Address6(clientIp).address;
            return await this.userSessionMapper.updateUserSession(userId, token, expiresAt, ipAddress, user.username);
        } catch (e) {
            throw new InternalServerError(e);
        }
    }

    async deleteUserSession(userId, token, clientIp) {
        try {
            const ipAddress = new Address6(clientIp).address;
            return await this.userSessionMapper.deleteUserSession(userId, token, ipAddress);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async verifyUserSession(userId, token, clientIp) {
        try {
            // const ipAddress = new Address6(clientIp).address;
            // TODO: save the last ipAddress of the device trying this session
            return await this.userSessionMapper.verifyUserSession(userId, token);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }
}

export default UserSessionModel;