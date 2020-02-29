/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class NetworkWalkError extends require("./../general/InternalServerError") {
    constructor(error, message = "Network Walk Error", details = "Network could not be traversed from current location") {
        // Providing default message and overriding status code.
        super(error, message, details, 500);
    }
};