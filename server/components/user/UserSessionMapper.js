import { Unauthorized, UserSessionNotFound } from "../../errors";

class UserSessionMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("userSessions"),
        });
    }

    updateUserSession(userId, token, expiresAt, ipAddress, username) {
        return new Promise((resolve, reject) => {
            this.collection.findAndModify({
                query: {
                    userId,
                    token,
                },
                new: true,
                upsert: true,
                update: {
                    $unset: {
                        deletedAt: true,
                        isDeleted: true,
                    },
                    $set: {
                        token,
                        expiresAt: new Date(expiresAt),
                        ipAddress,
                        modifiedBy: ipAddress,
                        username,
                        modifiedAt: new Date(),
                    },
                },
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                return resolve({
                    userId: doc.userId,
                    ipAddress: doc.ipAddress,
                    token: doc.token,
                    expiresAt: doc.expiresAt,
                    username: doc.username,
                });
            });
        });
    }

    deleteUserSession(userId, token, clientIp) {
        return new Promise((resolve, reject) => {
            this.collection.findAndModify({
                query: {
                    userId,
                    token,
                    expiresAt: {
                        $gt: new Date(),
                    },
                },
                new: true,
                upsert: false,
                update: {
                    $unset: {
                        token: true,
                        expiresAt: true,
                    },
                    $set: {
                        deletedAt: new Date(),
                        isDeleted: true,
                        modifiedBy: clientIp,
                        modifiedAt: new Date(),
                    },
                },
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new UserSessionNotFound());
                }
                return resolve({
                    userId: doc.userId,
                    ipAddress: doc.ipAddress,
                    deletedAt: doc.deletedAt,
                    username: doc.username,
                });
            });
        });
    }

    verifyUserSession(userId, token) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                userId,
                token,
                expiresAt: {
                    $gt: new Date(),
                },
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new Unauthorized());
                }
                return resolve({
                    userId: doc.userId,
                    ipAddress: doc.ipAddress,
                    token: doc.token,
                    expiresAt: doc.expiresAt,
                    username: doc.username,
                });
            });
        });
    }
}

export default UserSessionMapper;