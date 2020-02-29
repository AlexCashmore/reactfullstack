/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class GatewayTimeout extends require("./../AppError") {
    constructor(message = "Gateway Timeout", details = "Network service is not responding") {
        // Providing default message and overriding status code.
        super(message, details, 504);
    }
};