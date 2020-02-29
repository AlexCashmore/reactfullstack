import { OrganizationNotFound } from "../../errors";

class OrganizationMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("organizations"),
        });
        Object.defineProperty(this, "users", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("users"),
        });
    }

    createOrganization(organizationId, {
        parentId, rootId, name, type, isDistributionCenter, externalAPI, externalReferenceId, externalCompanyName, externalFleetName, externalGeofenceGroup, address, email,
    }) {
        return new Promise((resolve, reject) => {
            this.collection.insert({
                organizationId,
                rootId,
                parentId,
                name,
                type,
                isDistributionCenter,
                externalAPI,
                externalReferenceId,
                externalCompanyName,
                externalFleetName,
                externalGeofenceGroup,
                address,
                email,
                freshWarehouseTemperature: null,
                frozenWarehouseTemperature: null,
                createdAt: new Date(),
            }, (err, doc) => {
                if(err) {
                    return reject(err);
                }
                return resolve({
                    organizationId: doc.organizationId,
                    rootId: doc.rootId,
                    parentId: doc.parentId,
                    name: doc.name,
                    type: doc.type,
                    isDistributionCenter: doc.isDistributionCenter,
                    externalAPI: doc.externalAPI,
                    externalReferenceId: doc.externalReferenceId,
                    externalCompanyName: doc.externalCompanyName,
                    externalFleetName: doc.externalFleetName,
                    externalGeofenceGroup: doc.externalGeofenceGroup,
                    address: doc.address,
                    email: doc.email,
                    createdAt: doc.createdAt,
                });
            });
        });
    }

    getOrganization(organizationId) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                organizationId,
            }, {
                _id: 0,
                organizationId: 1,
                rootId: 1,
                parentId: 1,
                name: 1,
                type: 1,
                isDistributionCenter: 1,
                externalAPI: 1,
                externalReferenceId: 1,
                externalCompanyName: 1,
                externalFleetName: 1,
                externalGeofenceGroup: 1,
                address: 1,
                email: 1,
                freshWarehouseTemperature: 1,
                frozenWarehouseTemperature: 1,
                createdAt: 1,
                modifiedAt: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new OrganizationNotFound());
                }
                return resolve(doc);
            });
        });
    }

    getOrganizationsByExternalAPI(externalAPI) {
        return new Promise((resolve, reject) => {
            this.collection.find({
                externalAPI,
            }, {
                _id: 0,
                organizationId: 1,
                rootId: 1,
                parentId: 1,
                name: 1,
                type: 1,
                isDistributionCenter: 1,
                externalAPI: 1,
                externalReferenceId: 1,
                externalCompanyName: 1,
                externalFleetName: 1,
                externalGeofenceGroup: 1,
                address: 1,
                email: 1,
                freshWarehouseTemperature: 1,
                frozenWarehouseTemperature: 1,
                createdAt: 1,
                modifiedAt: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new OrganizationNotFound());
                }
                return resolve(doc);
            });
        });
    }

    getOrganizationsByRootRelated(organizationId) {
        return new Promise((resolve, reject) => {
            this.collection.find({
                $or: [
                    {
                        organizationId,
                    },
                    {
                        rootId: organizationId,
                    },
                ],
            }, {
                _id: 0,
                organizationId: 1,
                rootId: 1,
                parentId: 1,
                name: 1,
                type: 1,
                isDistributionCenter: 1,
                externalAPI: 1,
                externalReferenceId: 1,
                externalCompanyName: 1,
                externalFleetName: 1,
                externalGeofenceGroup: 1,
                address: 1,
                email: 1,
                freshWarehouseTemperature: 1,
                frozenWarehouseTemperature: 1,
                createdAt: 1,
                modifiedAt: 1,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    return reject(new OrganizationNotFound());
                }
                return resolve(doc);
            });
        });
    }

    getUsersByOrganization(organizationId) {
        return new Promise((resolve, reject) => {
            this.users.find({
                organizationId,
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
                return resolve(doc);
            });
        });
    }

    updateOrganization(organizationId, {
        name,
        type,
        isDistributionCenter,
        externalAPI,
        externalReferenceId,
        externalCompanyName,
        externalFleetName,
        externalGeofenceGroup,
        address,
        email,
        freshWarehouseTemperature,
        frozenWarehouseTemperature,
    }) {
        return new Promise((resolve, reject) => {
            this.collection.findAndModify({
                query: {
                    organizationId,
                },
                new: true,
                upsert: false,
                update: {
                    $set: Object.assign({}, {
                        name,
                        type,
                        isDistributionCenter,
                        externalAPI,
                        externalReferenceId,
                        externalCompanyName,
                        externalFleetName,
                        externalGeofenceGroup,
                        address,
                        email,
                        modifiedAt: new Date(),
                    },
                    typeof freshWarehouseTemperature !== "undefined" ? { freshWarehouseTemperature } : {},
                    typeof frozenWarehouseTemperature !== "undefined" ? { frozenWarehouseTemperature } : {}),
                },
            }, (err, doc) => {
                if(err) {
                    return reject(err);
                }
                return resolve({
                    organizationId: doc.organizationId,
                    parentId: doc.parentId,
                    name: doc.name,
                    type: doc.type,
                    isDistributionCenter: doc.isDistributionCenter,
                    externalAPI: doc.externalAPI,
                    externalReferenceId: doc.externalReferenceId,
                    externalCompanyName: doc.externalCompanyName,
                    externalFleetName: doc.externalFleetName,
                    externalGeofenceGroup: doc.externalGeofenceGroup,
                    address: doc.address,
                    email: doc.email,
                    freshWarehouseTemperature: doc.freshWarehouseTemperature,
                    frozenWarehouseTemperature: doc.frozenWarehouseTemperature,
                    createdAt: doc.createdAt,
                    modifiedAt: doc.modifiedAt,
                });
            });
        });
    }
}

export default OrganizationMapper;