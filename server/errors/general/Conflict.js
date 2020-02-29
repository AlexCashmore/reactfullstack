/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class Conflict extends require("./../AppError") {
    constructor(message = "Conflict", details = "Resource already exists") {
        // Providing default message and overriding status code.
        super(message, details, 409);
    }
};