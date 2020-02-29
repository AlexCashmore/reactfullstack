/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class AssetNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Asset not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};