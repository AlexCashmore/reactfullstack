import exposeEndpoints from "../../../utils/exposeEndpoints";

import UserController from "./UserController";

module.exports = (expressApp, {
    userModel, userSessionModel, userInfoModel,
}) => {
    const userController = new UserController(userModel, userSessionModel, userInfoModel);
    exposeEndpoints(expressApp, userController);
};