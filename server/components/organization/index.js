import exposeEndpoints from "../../../utils/exposeEndpoints";

import OrganizationController from "./OrganizationController";

module.exports = (expressApp, {
    organizationModel, userSessionModel,
}) => {
    const organizationController = new OrganizationController(organizationModel, userSessionModel);
    exposeEndpoints(expressApp, organizationController);
};