/**
 * Created by devsnowy on 10/11/2019.
 */
module.exports = class ProductOverwritesNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Product overwrites not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};