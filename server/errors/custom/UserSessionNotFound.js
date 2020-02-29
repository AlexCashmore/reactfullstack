/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class UserSessionNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "User session not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};