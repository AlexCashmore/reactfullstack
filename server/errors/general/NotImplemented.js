/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class NotImplemented extends require("./../AppError") {
    constructor(message = "Not Implemented", details = "Method is not implemented") {
        // Providing default message and overriding status code.
        super(message, details, 501);
    }
};