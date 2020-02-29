/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class Unauthorized extends require("./../AppError") {
    constructor(message = "Unauthorized", details = "You do not have access to this resource") {
        // Providing default message and overriding status code.
        super(message, details, 401);
    }
};