/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class RouteNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Route not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};