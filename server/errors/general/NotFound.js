/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class NotFound extends require("./../AppError") {
    constructor(message = "Not Found", details = "Resource not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};