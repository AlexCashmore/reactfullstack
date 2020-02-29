import { UserNotFound } from "../../errors";

class UserInfoMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("users"),
        });
    }

    getUserInfo(userId) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                userId,
            }, {
                _id: 0,
                userId: 1,
                username: 1,
                nickname: 1,
                email: 1,
                organizationId: 1,
                firstName: 1,
                lastName: 1,
                address: 1,
                phone: 1,
                temperatureUnit: 1,
                temperatureUnitSymbol: 1,
                timezone: 1,
                timezoneOffset: 1,
                createdAt: 1,
                modifiedAt: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new UserNotFound());
                }
                return resolve(doc);
            });
        });
    }

    updateUserInfo(userId, {
        firstName, lastName, nickname, phone, address, temperatureUnit, temperatureUnitSymbol, timezone, timezoneOffset,
    }) {
        return new Promise((resolve, reject) => {
            this.collection.findAndModify({
                query: {
                    userId,
                },
                new: true,
                upsert: false,
                update: {
                    $set: Object.assign({}, {
                        firstName,
                        lastName,
                        nickname,
                        phone,
                        temperatureUnit,
                        temperatureUnitSymbol,
                        timezone,
                        timezoneOffset,
                        modifiedAt: new Date(),
                    },
                    typeof address.street !== "undefined" ? { "address.street": address.street } : {},
                    typeof address.city !== "undefined" ? { "address.city": address.city } : {},
                    typeof address.state !== "undefined" ? { "address.state": address.state } : {},
                    typeof address.region !== "undefined" ? { "address.region": address.region } : {},
                    typeof address.postCode !== "undefined" ? { "address.postCode": address.postCode } : {},
                    typeof address.country !== "undefined" ? { "address.country": address.country } : {}),
                },
                fields: {
                    _id: 0,
                    userId: 1,
                    username: 1,
                    nickname: 1,
                    email: 1,
                    organizationId: 1,
                    firstName: 1,
                    lastName: 1,
                    address: 1,
                    phone: 1,
                    temperatureUnit: 1,
                    temperatureUnitSymbol: 1,
                    timezone: 1,
                    timezoneOffset: 1,
                    createdAt: 1,
                    modifiedAt: 1,
                },
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                return resolve(doc);
            });
        });
    }
}

export default UserInfoMapper;