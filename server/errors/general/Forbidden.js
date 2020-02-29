/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class Forbidden extends require("./../AppError") {
    constructor(message = "Forbidden", details = "Access denied") {
        // Providing default message and overriding status code.
        super(message, details, 403);
    }
};