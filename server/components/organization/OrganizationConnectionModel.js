import uuidv4 from "uuid/v4";

import {
    BadRequest, Conflict, InternalServerError, AppError,
} from "../../errors";

class OrganizationConnectionModel {
    constructor({
        organizationMapper,
        organizationConnectionMapper,
    }, {
        networkModel,
    }) {
        Object.defineProperty(this, "organizationMapper", {
            enumerable: true,
            configurable: false,
            value: organizationMapper,
        });
        Object.defineProperty(this, "organizationConnectionMapper", {
            enumerable: true,
            configurable: false,
            value: organizationConnectionMapper,
        });
        Object.defineProperty(this, "networkModel", {
            enumerable: true,
            configurable: false,
            value: networkModel,
        });
    }

    async createOrganizationConnection(type, source, destination) {
        if(!source || !destination) {
            throw new BadRequest("Source and destination arguments are required");
        }
        if(source === destination) {
            throw new BadRequest("Source must be different from destination");
        }
        try {
            const connectionId = await uuidv4(); // generating an uuidv4 connectionId
            await this.organizationMapper.getOrganization(source);
            await this.organizationMapper.getOrganization(destination);
            return await this.organizationConnectionMapper.createOrganizationConnection(connectionId, {
                type,
                source,
                destination,
            });
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

    async createDistributionOrganizationConnection(source, destination) {
        try {
            return await this.createOrganizationConnection("distribution", source, destination);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationConnection(connectionId) {
        try {
            return await this.organizationConnectionMapper.getOrganizationConnection(connectionId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationConnectionsBySource(organizationId) {
        try {
            return await this.organizationConnectionMapper.getOrganizationConnectionsBySource(organizationId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationConnectionsByDestination(organizationId) {
        try {
            return await this.organizationConnectionMapper.getOrganizationConnectionsByDestination(organizationId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getOrganizationConnections(organizationId) {
        try {
            return await this.organizationConnectionMapper.getOrganizationConnections(organizationId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async removeOrganizationConnection(connectionId) {
        try {
            // TODO: check permissions before allowing someone to remove an organization connection
            await this.organizationConnectionMapper.getOrganizationConnection(connectionId);
            return await this.organizationConnectionMapper.removeOrganizationConnection(connectionId);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }
}

export default OrganizationConnectionModel;