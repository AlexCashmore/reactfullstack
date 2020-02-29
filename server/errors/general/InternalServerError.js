/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class InternalServerError extends require("./../AppError") {
    constructor(error, message = "Internal Server Error", details = "Application error, please try again later") {
        // Providing default message and overriding status code.
        super(message, details, 500, error instanceof Error ? error.stack : null);
        if(error instanceof Error) {
            console.log(error.stack);
        }
    }
};