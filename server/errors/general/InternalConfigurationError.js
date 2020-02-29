/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class InternalConfigurationError extends require("./../AppError") {
    constructor(message = "Internal Configuration Error", details = "Configuration error, please try again later") {
        // Providing default message and overriding status code.
        super(message, details, 506);
    }
};