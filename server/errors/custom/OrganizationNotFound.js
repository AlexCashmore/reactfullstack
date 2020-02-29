/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class OrganizationNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Organization not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};