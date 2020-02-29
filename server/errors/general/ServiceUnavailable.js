/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class ServiceUnavailable extends require("./../AppError") {
    constructor(message = "Service Unavailable", details = "Method is currently unavailable, please try again later") {
        // Providing default message and overriding status code.
        super(message, details, 503);
    }
};