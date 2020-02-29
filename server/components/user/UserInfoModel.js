import moment from "moment-timezone";

import { temperatureConfig } from "../../core/entities/config";

import {
    InternalServerError, AppError,
} from "../../errors";

class UserInfoModel {
    constructor({
        userInfoMapper,
    }) {
        Object.defineProperty(this, "userInfoMapper", {
            enumerable: true,
            configurable: false,
            value: userInfoMapper,
        });
    }

    async getUserInfo(userId) {
        try {
            return await this.userInfoMapper.getUserInfo(userId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async updateUserInfo(userId, {
        firstName, lastName, nickname, phone, street, city, state, region, postCode, country, temperatureUnit, timezone,
    }) {
        try {
            const address = {
                street, city, state, region, postCode, country,
            };
            const temperatureUnitSymbol = temperatureConfig.typesSymbols[temperatureUnit];
            const timezoneOffset = moment().tz(timezone).format("Z");
            return await this.userInfoMapper.updateUserInfo(userId, {
                firstName, lastName, nickname, phone, address, temperatureUnit, temperatureUnitSymbol, timezone, timezoneOffset,
            });
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }
}

export default UserInfoModel;