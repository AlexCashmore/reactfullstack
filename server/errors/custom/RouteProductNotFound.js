/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class RouteProductNotFound extends require("./../custom/ProductNotFound") {
    constructor(message = "Not Found", details = "Route product not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};