/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class ProductTypeNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Product type not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};