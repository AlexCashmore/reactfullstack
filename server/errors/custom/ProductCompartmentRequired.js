/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class ProductCompartmentRequired extends require("./../general/BadRequest") {
    constructor(message = "Bad Request", details = "Product compartment number is required") {
        // Providing default message and overriding status code.
        super(message, details, 400);
    }
};