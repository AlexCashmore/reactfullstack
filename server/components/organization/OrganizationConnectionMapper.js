import { OrganizationConnectionNotFound } from "../../errors";

class OrganizationConnectionMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("organizationConnections"),
        });
    }

    createOrganizationConnection(connectionId, {
        type, source, destination,
    }) {
        return new Promise((resolve, reject) => {
            this.collection.insert({
                connectionId,
                type,
                source,
                destination,
                createdAt: new Date(),
            }, (err, doc) => {
                if(err) {
                    return reject(err);
                }
                return resolve({
                    connectionId: doc.connectionId,
                    type: doc.type,
                    source: doc.source,
                    destination: doc.destination,
                    createdAt: doc.createdAt,
                });
            });
        });
    }

    getOrganizationConnection(connectionId) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                connectionId,
            }, {
                _id: 0,
                connectionId: 1,
                type: 1,
                source: 1,
                destination: 1,
                createdAt: 1,
                modifiedAt: 1,
                deletedAt: 1,
                isDeleted: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new OrganizationConnectionNotFound());
                }
                return resolve(doc);
            });
        });
    }

    getOrganizationConnectionsBySource(organizationId) {
        return new Promise((resolve, reject) => {
            this.collection.find({
                $and: [
                    {
                        deletedAt: { $exists: false },
                    },
                    {
                        source: organizationId,
                    },
                ],
            }, {
                _id: 0,
                connectionId: 1,
                type: 1,
                source: 1,
                destination: 1,
                createdAt: 1,
                modifiedAt: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new OrganizationConnectionNotFound());
                }
                return resolve(doc);
            });
        });
    }

    getOrganizationConnectionsByDestination(organizationId) {
        return new Promise((resolve, reject) => {
            this.collection.find({
                $and: [
                    {
                        deletedAt: { $exists: false },
                    },
                    {
                        destination: organizationId,
                    },
                ],
            }, {
                _id: 0,
                connectionId: 1,
                type: 1,
                source: 1,
                destination: 1,
                createdAt: 1,
                modifiedAt: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new OrganizationConnectionNotFound());
                }
                return resolve(doc);
            });
        });
    }

    getOrganizationConnections(organizationId) {
        return new Promise((resolve, reject) => {
            this.collection.find({
                $and: [
                    {
                        deletedAt: { $exists: false },
                    },
                    {
                        $or: [
                            {
                                source: organizationId,
                            },
                            {
                                destination: organizationId,
                            },
                        ],
                    },
                ],
            }, {
                _id: 0,
                connectionId: 1,
                type: 1,
                source: 1,
                destination: 1,
                createdAt: 1,
                modifiedAt: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new OrganizationConnectionNotFound());
                }
                return resolve(doc);
            });
        });
    }

    removeOrganizationConnection(connectionId) {
        return new Promise((resolve, reject) => {
            this.collection.findAndModify({
                query: {
                    connectionId,
                },
                new: true,
                upsert: false,
                update: {
                    $set: {
                        deletedAt: new Date(),
                        isDeleted: true,
                        modifiedAt: new Date(),
                    },
                },
                fields: {
                    _id: 0,
                    connectionId: 1,
                    type: 1,
                    source: 1,
                    destination: 1,
                    createdAt: 1,
                    modifiedAt: 1,
                    deletedAt: 1,
                    isDeleted: 1,
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

export default OrganizationConnectionMapper;