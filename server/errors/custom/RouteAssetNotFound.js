/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class RouteAssetNotFound extends require("./../custom/AssetNotFound") {
    constructor(message = "Not Found", details = "Route asset not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};