/**
 * Created by devsnowy on 1/4/2019.
 */
// AppError
module.exports.AppError = require("./AppError");

// Custom errors
module.exports.DatabaseConnectionError = require("./custom/DatabaseConnectionError");
module.exports.UsernameOrEmailConflict = require("./custom/UsernameOrEmailConflict");
module.exports.InsufficientPermissions = require("./custom/InsufficientPermissions");
module.exports.AssetNotFound = require("./custom/AssetNotFound");
module.exports.GeofenceNotFound = require("./custom/GeofenceNotFound");
module.exports.NetworkNotFound = require("./custom/NetworkNotFound");
module.exports.OrganizationNotFound = require("./custom/OrganizationNotFound");
module.exports.RouteNotFound = require("./custom/RouteNotFound");
module.exports.UserSessionNotFound = require("./custom/UserSessionNotFound");
module.exports.UserNotFound = require("./custom/UserNotFound");
module.exports.TemplateNotFound = require("./custom/TemplateNotFound");
module.exports.ProductNotFound = require("./custom/ProductNotFound");
module.exports.RouteProductNotFound = require("./custom/RouteProductNotFound");
module.exports.RouteAssetNotFound = require("./custom/RouteAssetNotFound");
module.exports.ProductAutoCompartmentConflict = require("./custom/ProductAutoCompartmentConflict");
module.exports.ProductTypeNotFound = require("./custom/ProductTypeNotFound");
module.exports.ProductCompartmentRequired = require("./custom/ProductCompartmentRequired");
module.exports.RedisDatabaseConnectionError = require("./custom/RedisDatabaseConnectionError");
module.exports.RouteEventNotFound = require("./custom/RouteEventNotFound");
module.exports.ProductInheritanceError = require("./custom/ProductInheritanceError");
module.exports.ProductOverwritesNotFound = require("./custom/ProductOverwritesNotFound");
module.exports.NetworkWalkError = require("./custom/NetworkWalkError");
module.exports.OrganizationConnectionNotFound = require("./custom/OrganizationConnectionNotFound");

// General errors
module.exports.BadGateway = require("./general/BadGateway");
module.exports.BadRequest = require("./general/BadRequest");
module.exports.Conflict = require("./general/Conflict");
module.exports.Forbidden = require("./general/Forbidden");
module.exports.GatewayTimeout = require("./general/GatewayTimeout");
module.exports.InternalConfigurationError = require("./general/InternalConfigurationError");
module.exports.InternalServerError = require("./general/InternalServerError");
module.exports.NotFound = require("./general/NotFound");
module.exports.NotImplemented = require("./general/NotImplemented");
module.exports.PaymentRequired = require("./general/PaymentRequired");
module.exports.ServiceUnavailable = require("./general/ServiceUnavailable");
module.exports.Unauthorized = require("./general/Unauthorized");