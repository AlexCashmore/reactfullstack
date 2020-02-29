module.exports = class RedisDatabaseConnectionError extends require("./../custom/DatabaseConnectionError") {
    constructor(message = "Redis Database Connection Error", details = "Not able to connect or connection timed out.") {
        // Providing default message and overriding status code.
        super(message, details, 502);
    }
};