module.exports = class DatabaseConnectionError extends require("./../general/BadGateway") {
    constructor(message = "Database Connection Error", details = "Not able to connect or connection timed out.") {
        // Providing default message and overriding status code.
        super(message, details, 502);
    }
};