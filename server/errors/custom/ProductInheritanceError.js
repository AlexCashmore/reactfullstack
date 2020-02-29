/**
 * Created by devsnowy on 10/10/2019.
 */
module.exports = class ProductInheritanceError extends require("./../general/Forbidden") {
    constructor(message = "Product Inheritance Error", details = "Product can not be inherited to set an overwrite for your organization") {
        // Providing default message and overriding status code.
        super(message, details, 403);
    }
};