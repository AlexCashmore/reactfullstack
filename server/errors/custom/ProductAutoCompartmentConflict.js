/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class ProductAutoCompartmentConflict extends require("./../general/Conflict") {
    constructor(message = "Conflict", details = "Product can't be auto assigned to a compartment") {
        // Providing default message and overriding status code.
        super(message, details, 409);
    }
};