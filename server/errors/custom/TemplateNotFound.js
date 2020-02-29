/**
 * Created by devsnowy on 3/20/2019.
 */
module.exports = class TemplateNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Template not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};