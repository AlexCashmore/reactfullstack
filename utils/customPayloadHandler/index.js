/* payloadHandler */

let payloadErrors = {
    // Client errors
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found [API]", // TODO: Change this to "Not found" when we are done with the APIs.
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    420: "Enhance Your Calm",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    444: "No Response",
    449: "Retry With",
    450: "Blocked by Windows Parental Controls",
    451: "Unavailable For Legal Reasons",
    499: "Client Closed Request",

    // Server errors
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Internal Configuration Error",
    507: "Insufficient Storage",
    508: "Loop Detected",
    509: "Bandwidth Limit Exceeded",
    510: "Not Extended",
    511: "Network Authentication Required",
    598: "Network read timeout error",
    599: "Network connect timeout error",

    // System specific
    timeout: {
        reason: "Network read timeout error",
        status: 598,
    },
    connect: {
        reason: "Network connect timeout error",
        status: 599,
    },
};

const payloadHandler = {};
payloadHandler.errors = payloadErrors;

/* Functions */

payloadHandler.analyse = function analyse(payload, namespace, errorCallback, successCallback) {
    if(payload.response && payload.response.data) {
        if(typeof payloadErrors[payload.response.status] !== "undefined" && payloadErrors[payload.response.status]) {
            if(typeof errorCallback === "function") {
                errorCallback(payload.response.status);
            }

            const errorReason = namespace ? (payloadErrors[namespace] && payloadErrors[namespace][payload.response.status]
                ? payloadErrors[namespace][payload.response.status] : payloadErrors[payload.response.status]) : payloadErrors[payload.response.status];

            if(payload.response.status === 404) {
                return {
                    reason: errorReason,
                    status: payload.response.status,
                };
            }

            return Object.assign({}, payload.response.data, {
                reason: errorReason || payload.response.data.reason,
                status: payload.response.status,
            });
        }

        if(typeof successCallback === "function") {
            successCallback(payload.response.status);
        }

        return Object.assign({}, payload.response.data, {
            reason: payload.response.data.reason || "Not Implemented",
            status: payload.response.status,
        });
    }

    return payloadErrors.connect;
};

payloadHandler.setLanguage = function setLanguage(errors) {
    payloadErrors = Object.assign({}, payloadErrors, errors);
    payloadHandler.errors = payloadErrors;
};

module.exports = payloadHandler;