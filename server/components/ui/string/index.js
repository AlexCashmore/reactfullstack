import exposeEndpoints from "../../../../utils/exposeEndpoints";

import StringController from "./StringController";

module.exports = (expressApp, {
    stringModel,
}) => {
    const stringsController = new StringController(stringModel);
    exposeEndpoints(expressApp, stringsController);
};