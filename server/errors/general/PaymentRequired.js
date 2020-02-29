/**
 * Created by devsnowy on 1/4/2019.
 */
module.exports = class PaymentRequired extends require("./../AppError") {
    constructor(message = "Payment Required", details = "Action requires a payment") {
        // Providing default message and overriding status code.
        super(message, details, 402);
    }
};