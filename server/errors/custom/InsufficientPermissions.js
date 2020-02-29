/**
 * Created by devsnowy on 2/11/2019.
 */
module.exports = class InsufficientPermissions extends require("./../general/Forbidden") {
    constructor(message = "Insufficient Permission", details = "Action requires special permissions") {
        // Providing default message and overriding status code.
        super(message, details, 403);
    }
};