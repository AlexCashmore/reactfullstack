import validate from "../../../utils/customValidate";
import purify from "../../../utils/customPurify";

import {
    InternalServerError, AppError,
} from "../../errors";

class OrganizationController {
    constructor(organizationModel, userSessionModel) {
        Object.defineProperty(this, "organizationModel", {
            enumerable: true,
            configurable: false,
            value: organizationModel,
        });
        Object.defineProperty(this, "userSessionModel", {
            enumerable: true,
            configurable: false,
            value: userSessionModel,
        });
    }

    get createOrganization() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    body: validate(req.body, this.constructor.constraints.createOrganization.body),
                };
                if(validationErrors.body) {
                    return res.status(400).json(validationErrors.body);
                }
                const {
                    parentId, type, externalAPI, email,
                    userId, token,
                } = req.body;
                let {
                    name, externalReferenceId, externalCompanyName, externalFleetName, externalGeofenceGroup,
                } = req.body;
                name = purify.xss(name);
                externalReferenceId = purify.xss(externalReferenceId);
                externalCompanyName = purify.xss(externalCompanyName);
                externalFleetName = purify.xss(externalFleetName);
                externalGeofenceGroup = purify.xss(externalGeofenceGroup);
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const organization = await this.organizationModel.createOrganization(
                    parentId, name, type, externalAPI, externalReferenceId, externalCompanyName, externalFleetName, externalGeofenceGroup, {

                    }, email,
                );
                return res.status(201).json(organization);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get createOrganizationConnection() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    body: validate(req.body, this.constructor.constraints.createOrganizationConnection.body),
                };
                if(validationErrors.body) {
                    return res.status(400).json(validationErrors.body);
                }
                const {
                    type, source, destination,
                    userId, token,
                } = req.body;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const connection = await this.organizationModel.createOrganizationConnection(type, source, destination);
                return res.status(201).json(connection);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get getOrganization() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.getOrganization.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    organizationId, userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const organization = await this.organizationModel.getOrganization(organizationId);
                return res.status(200).json(organization);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get updateOrganization() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    body: validate(req.body, this.constructor.constraints.updateOrganization.body),
                    params: validate(req.params, this.constructor.constraints.updateOrganization.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                if(validationErrors.body) {
                    return res.status(400).json(validationErrors.body);
                }

                const {
                    type, externalAPI, email, freshWarehouseTemperature, frozenWarehouseTemperature,
                } = req.body;
                let {
                    name, externalReferenceId, externalCompanyName, externalFleetName, externalGeofenceGroup,
                } = req.body;
                name = purify.xss(name);
                externalReferenceId = purify.xss(externalReferenceId);
                externalCompanyName = purify.xss(externalCompanyName);
                externalFleetName = purify.xss(externalFleetName);
                externalGeofenceGroup = purify.xss(externalGeofenceGroup);
                const {
                    organizationId, userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const organization = await this.organizationModel.updateOrganization(
                    organizationId, name, type, externalAPI, externalReferenceId, externalCompanyName, externalFleetName, externalGeofenceGroup, {

                    }, email, freshWarehouseTemperature, frozenWarehouseTemperature,
                );
                return res.status(200).json(organization);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get getUsersByOrganization() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.getUsersByOrganization.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    organizationId, userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const users = await this.organizationModel.getUsersByOrganization(organizationId);
                return res.status(200).json(users);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get getOrganizationConnections() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.getOrganizationConnections.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    organizationId, userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const connections = await this.organizationModel.getOrganizationConnections(organizationId);
                return res.status(200).json(connections);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get getOrganizationConnection() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.getOrganizationConnection.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    connectionId, userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const connection = await this.organizationModel.getOrganizationConnection(connectionId);
                return res.status(200).json(connection);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }

    get removeOrganizationConnection() {
        return async (req, res) => {
            try {
                const validationErrors = {
                    params: validate(req.params, this.constructor.constraints.removeOrganizationConnection.params),
                };
                if(validationErrors.params) {
                    return res.status(400).json(validationErrors.params);
                }
                const {
                    connectionId, userId, token,
                } = req.params;
                const {
                    clientIp,
                } = req;
                await this.userSessionModel.verifyUserSession(userId, token, clientIp);
                const connection = await this.organizationModel.removeOrganizationConnection(connectionId);
                return res.status(200).json(connection);
            } catch (e) {
                if(e instanceof AppError) {
                    return res.status(e.status).json(e.getJSON());
                }
                const error = new InternalServerError(e);
                return res.status(error.status).json(error.getJSON());
            }
        };
    }
}

OrganizationController.constraints = {
    createOrganization: {
        body: {
            parentId: {
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            name: {
                presence: true,
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
            },
            type: {
                presence: true,
                inclusion: {
                    within: ["shipper", "carrier", "distribution"],
                    message: "is invalid",
                },
            },
            externalAPI: {
                isString: true,
                inclusion: {
                    within: ["ibe", "i360"],
                    message: "is invalid",
                },
                inclusionWhen: {
                    fields: {
                        type: "distribution",
                    },
                    values: ["ibe", "i360"],
                    message: "is invalid",
                },
            },
            externalReferenceId: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: ["ibe", "i360"],
                    },
                    message: "is required",
                },
            },
            externalCompanyName: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: "i360",
                    },
                    message: "is required",
                },
            },
            externalFleetName: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: "i360",
                    },
                    message: "is required",
                },
            },
            externalGeofenceGroup: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: "i360",
                    },
                    message: "is required",
                },
            },
            email: {
                isString: true,
                email: true,
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
    createOrganizationConnection: {
        body: {
            type: {
                presence: true,
                inclusion: {
                    within: ["distribution"],
                    message: "is invalid",
                },
            },
            source: {
                presence: true,
                isString: true,
                format: { // uuid v4 regex
                    pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
                    flags: "i",
                },
            },
            destination: {
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
    getOrganization: {
        params: {
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
    updateOrganization: {
        params: {
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
        body: {
            name: {
                presence: true,
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
            },
            type: {
                presence: true,
                inclusion: {
                    within: ["shipper", "carrier", "distribution"],
                    message: "is invalid",
                },
            },
            externalAPI: {
                isString: true,
                inclusion: {
                    within: ["ibe", "i360"],
                    message: "is invalid",
                },
                inclusionWhen: {
                    fields: {
                        type: "distribution",
                    },
                    values: ["ibe", "i360"],
                    message: "is invalid",
                },
            },
            externalReferenceId: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: ["ibe", "i360"],
                    },
                    message: "is required",
                },
            },
            externalCompanyName: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: "i360",
                    },
                    message: "is required",
                },
            },
            externalFleetName: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: "i360",
                    },
                    message: "is required",
                },
            },
            externalGeofenceGroup: {
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 100,
                },
                requiredWhen: {
                    fields: {
                        externalAPI: "i360",
                    },
                    message: "is required",
                },
            },
            email: {
                isString: true,
                email: true,
            },
            freshWarehouseTemperature: {
                isNumber: 1,
            },
            frozenWarehouseTemperature: {
                isNumber: 1,
            },
        },
    },
    getUsersByOrganization: {
        params: {
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
    getOrganizationConnections: {
        params: {
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
    getOrganizationConnection: {
        params: {
            connectionId: {
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
    removeOrganizationConnection: {
        params: {
            connectionId: {
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
};

OrganizationController.specs = {
    "/organization": {
        PUT: {
            method: "createOrganization",
            description: "This endpoint will create a new organization.",
            constraints: OrganizationController.constraints.createOrganization,
        },
    },
    "/organization/connection": {
        PUT: {
            method: "createOrganizationConnection",
            description: "This endpoint will create a new connection between organizations.",
            constraints: OrganizationController.constraints.createOrganizationConnection,
        },
    },
    "/organization/:organizationId/:userId/:token": {
        GET: {
            method: "getOrganization",
            description: "This endpoint will get an organization.",
            constraints: OrganizationController.constraints.getOrganization,
        },
        PUT: {
            method: "updateOrganization",
            description: "This endpoint will update an organization.",
            constraints: OrganizationController.constraints.updateOrganization,
        },
    },
    "/organization/users/:organizationId/:userId/:token": {
        GET: {
            method: "getUsersByOrganization",
            description: "This endpoint will return the users from an organization.",
            constraints: OrganizationController.constraints.getUsersByOrganization,
        },
    },
    "/organization/connection/:connectionId/:userId/:token": {
        GET: {
            method: "getOrganizationConnection",
            description: "This endpoint will get an organization connection.",
            constraints: OrganizationController.constraints.getOrganizationConnection,
        },
        DELETE: {
            method: "removeOrganizationConnection",
            description: "This endpoint will remove an organization connection.",
            constraints: OrganizationController.constraints.removeOrganizationConnection,
        },
    },
    "/organization/connections/:organizationId/:userId/:token": {
        GET: {
            method: "getOrganizationConnections",
            description: "This endpoint will return the connections from an organization.",
            constraints: OrganizationController.constraints.getOrganizationConnections,
        },
    },
};

export default OrganizationController;