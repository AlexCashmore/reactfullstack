/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class BadGateway extends require("./../AppError") {
    constructor(message = "Bad Gateway", details = "Not able to get a valid or any response from the origin server") {
        // Providing default message and overriding status code.
        super(message, details, 502);
    }
};