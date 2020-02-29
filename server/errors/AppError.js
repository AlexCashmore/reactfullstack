/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class AppError extends Error {
    constructor(message, details, status, stack) {
        // Calling parent constructor of base Error class.
        super(message || "Application Error");

        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;

        // Saving the details for the error
        this.details = details;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        // Adding the stack for an syntax or unknown error
        if(stack) {
            this.stack = stack;
        }

        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `500` is the default value if not specified.
        this.status = status || 500;
    }

    getJSON() {
        const { status, message, details } = this;
        return {
            status,
            message,
            details,
        };
    }
};