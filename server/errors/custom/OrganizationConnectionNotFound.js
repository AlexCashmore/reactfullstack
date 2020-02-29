/**
 * Created by devsnowy on 10/21/2019.
 */
module.exports = class OrganizationConnectionNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Organization connection not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};