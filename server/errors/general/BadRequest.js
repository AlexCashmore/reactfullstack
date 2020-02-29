/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class BadRequest extends require("./../AppError") {
    constructor(message = "Bad Request", details = "Request or data validation error") {
        // Providing default message and overriding status code.
        super(message, details, 400);
    }
};