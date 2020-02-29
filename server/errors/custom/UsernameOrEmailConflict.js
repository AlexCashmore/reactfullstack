/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class UsernameOrEmailConflict extends require("./../general/Conflict") {
    constructor(message = "Conflict", details = "Username or email address already in use") {
        // Providing default message and overriding status code.
        super(message, details, 409);
    }
};