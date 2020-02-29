import exposeEndpoints from "../../../../utils/exposeEndpoints";

import PageController from "./PageController";

module.exports = (expressApp, {
    pageModel,
}) => {
    const pageControllerInstance = new PageController(pageModel);
    exposeEndpoints(expressApp, pageControllerInstance);
};