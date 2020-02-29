import { UserNotFound, UsernameOrEmailConflict } from "../../errors";

class UserMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("users"),
        });
        Object.defineProperty(this, "userReservations", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("userReservations"),
        });
    }

    createUser(userId, username, email, usernameLoginHash, passwordLoginHash, organizationId, ipAddress) {
        return new Promise((resolve, reject) => {
            this.collection.insert({
                userId,
                username,
                email,
                usernameLoginHash,
                passwordLoginHash,
                ipAddress,
                organizationId,
                createdAt: new Date(),
            }, (err, doc) => {
                if(err) {
                    return reject(err);
                }
                return resolve({
                    userId: doc.userId,
                    username: doc.username,
                    email: doc.email,
                    organizationId: doc.organizationId,
                    createdAt: doc.createdAt,
                });
            });
        });
    }

    getUserByUsername(usernameLoginHash) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                usernameLoginHash,
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

    getUser(userId) {
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

    verifyReservedUsernameOrEmail(usernameLoginHash, email) {
        return new Promise((resolve, reject) => {
            this.userReservations.findOne({
                $or: [
                    {
                        usernameLoginHash,
                    },
                    {
                        email,
                    },
                ],
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(doc && (doc.usernameLoginHash !== usernameLoginHash || doc.email !== email)) {
                    return reject(new UsernameOrEmailConflict());
                }
                return resolve(null);
            });
        });
    }
}

export default UserMapper;