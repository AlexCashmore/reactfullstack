/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class NetworkNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Network not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};