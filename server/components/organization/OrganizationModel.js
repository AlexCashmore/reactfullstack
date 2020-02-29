import uuidv4 from "uuid/v4";

import {
    InsufficientPermissions, NotFound, Conflict, InternalServerError, AppError,
} from "../../errors";

class OrganizationModel {
    constructor({
        organizationMapper,
    }, {
        networkModel,
        organizationConnectionModel,
    }) {
        Object.defineProperty(this, "organizationMapper", {
            enumerable: true,
            configurable: false,
            value: organizationMapper,
        });
        Object.defineProperty(this, "networkModel", {
            enumerable: true,
            configurable: false,
            value: networkModel,
        });
        Object.defineProperty(this, "organizationConnectionModel", {
            enumerable: true,
            configurable: false,
            value: organizationConnectionModel,
        });
    }

    async createOrganization(parentId, name, type, externalAPI, externalReferenceId, externalCompanyName, externalFleetName, externalGeofenceGroup, address, email) {
        let network = {};
        let parentOrganization = null;
        try {
            if(parentId) {
                parentOrganization = await this.organizationMapper.getOrganization(parentId);
                // TODO: check if user has permissions to create a children on this parent - if we add this feature for public access
            }
            const organizationId = await uuidv4(); // generating an uuidv4 organizationId
            const isDistributionCenter = type === "distribution";
            const organization = await this.organizationMapper.createOrganization(organizationId, {
                rootId: parentOrganization ? parentOrganization.rootId : organizationId,
                parentId,
                name,
                isDistributionCenter,
                type,
                externalAPI,
                externalReferenceId,
                externalCompanyName,
                externalFleetName,
                externalGeofenceGroup,
                address, // TODO: add address fields
                email,
            });

            network = await this.networkModel.updateNetworkByRootOrganization(parentOrganization ? parentOrganization.rootId : organizationId);

            return {
                organization,
                network,
            };
        } catch (e) {
            if(e.code === 11000) {
                throw new Conflict();
            }
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganization(organizationId) {
        try {
            return await this.organizationMapper.getOrganization(organizationId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationsByExternalAPI(externalAPI) {
        try {
            return await this.organizationMapper.getOrganizationsByExternalAPI(externalAPI);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationsByRootRelated(organizationId) {
        try {
            return await this.organizationMapper.getOrganizationsByRootRelated(organizationId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async updateOrganization(
        organizationId,
        name,
        type,
        externalAPI,
        externalReferenceId,
        externalCompanyName,
        externalFleetName,
        externalGeofenceGroup,
        address,
        email,
        freshWarehouseTemperature,
        frozenWarehouseTemperature,
    ) {
        let network = {};
        const organization = await this.organizationMapper.getOrganization(organizationId);
        try {
            const isDistributionCenter = type === "distribution";
            const newOrganization = await this.organizationMapper.updateOrganization(organizationId, {
                name,
                type,
                isDistributionCenter,
                externalAPI,
                externalReferenceId,
                externalCompanyName,
                externalFleetName,
                externalGeofenceGroup,
                address, // TODO: add address fields
                email,
                freshWarehouseTemperature,
                frozenWarehouseTemperature,
            });

            network = await this.networkModel.updateNetworkByRootOrganization(organization.rootId);

            return {
                organization: newOrganization,
                network,
            };
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getUsersByOrganization(organizationId) {
        try {
            return await this.organizationMapper.getUsersByOrganization(organizationId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async createOrganizationConnection(type, source, destination) {
        try {
            return await this.organizationConnectionModel.createOrganizationConnection(type, source, destination);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationConnections(organizationId) {
        try {
            return await this.organizationConnectionModel.getOrganizationConnections(organizationId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationConnection(connectionId) {
        try {
            return await this.organizationConnectionModel.getOrganizationConnection(connectionId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async removeOrganizationConnection(connectionId) {
        try {
            return await this.organizationConnectionModel.removeOrganizationConnection(connectionId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }
}

export default OrganizationModel;