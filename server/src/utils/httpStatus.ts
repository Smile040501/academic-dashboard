export const httpStatusNames = {
    OK: "OK",
    CREATED: "CREATED",
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    PAYMENT_REQUIRED: "PAYMENT_REQUIRED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
    NOT_ACCEPTABLE: "NOT_ACCEPTABLE",
    PROXY_AUTHENTICATION_REQUIRED: "PROXY_AUTHENTICATION_REQUIRED",
    REQUEST_TIMEOUT: "REQUEST_TIMEOUT",
    CONFLICT: "CONFLICT",
    GONE: "GONE",
    LENGTH_REQUIRED: "LENGTH_REQUIRED",
    PRECONDITION_FAILED: "PRECONDITION_FAILED",
    PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
    URI_TOO_LONG: "URI_TOO_LONG",
    UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE",
    RANGE_NOT_SATISFIABLE: "RANGE_NOT_SATISFIABLE",
    EXPECTATION_FAILED: "EXPECTATION_FAILED",
    IM_A_TEAPOT: "IM_A_TEAPOT",
    MISDIRECTED_REQUEST: "MISDIRECTED_REQUEST",
    UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
    LOCKED: "LOCKED",
    FAILED_DEPENDENCY: "FAILED_DEPENDENCY",
    UNORDERED_COLLECTION: "UNORDERED_COLLECTION",
    UPGRADE_REQUIRED: "UPGRADE_REQUIRED",
    PRECONDITION_REQUIRED: "PRECONDITION_REQUIRED",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    REQUEST_HEADER_FIELDS_TOO_LARGE: "REQUEST_HEADER_FIELDS_TOO_LARGE",
    UNAVAILABLE_FOR_LEGAL_REASONS: "UNAVAILABLE_FOR_LEGAL_REASONS",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
    BAD_GATEWAY: "BAD_GATEWAY",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
    HTTP_VERSION_NOT_SUPPORTED: "HTTP_VERSION_NOT_SUPPORTED",
    VARIANT_ALSO_NEGOTIATES: "VARIANT_ALSO_NEGOTIATES",
    INSUFFICIENT_STORAGE: "INSUFFICIENT_STORAGE",
    LOOP_DETECTED: "LOOP_DETECTED",
    BANDWIDTH_LIMIT_EXCEEDED: "BANDWIDTH_LIMIT_EXCEEDED",
    NOT_EXTENDED: "NOT_EXTENDED",
    NETWORK_AUTHENTICATION_REQUIRED: "NETWORK_AUTHENTICATION_REQUIRED",
};

export const httpStatusTypes = {
    [httpStatusNames.OK]: {
        message: "OK",
        status: 200,
    },
    [httpStatusNames.CREATED]: {
        message: "Created",
        status: 201,
    },
    [httpStatusNames.BAD_REQUEST]: {
        message: "Bad Request",
        status: 400,
    },
    [httpStatusNames.UNAUTHORIZED]: {
        message: "Unauthorized",
        status: 401,
    },
    [httpStatusNames.PAYMENT_REQUIRED]: {
        message: "Payment Required",
        status: 402,
    },
    [httpStatusNames.FORBIDDEN]: {
        message: "Forbidden",
        status: 403,
    },
    [httpStatusNames.NOT_FOUND]: {
        message: "Not Found",
        status: 404,
    },
    [httpStatusNames.METHOD_NOT_ALLOWED]: {
        message: "Method Not Allowed",
        status: 405,
    },
    [httpStatusNames.NOT_ACCEPTABLE]: {
        message: "Not Acceptable",
        status: 406,
    },
    [httpStatusNames.PROXY_AUTHENTICATION_REQUIRED]: {
        message: "Proxy Authentication Required",
        status: 407,
    },
    [httpStatusNames.REQUEST_TIMEOUT]: {
        message: "Request Timeout",
        status: 408,
    },
    [httpStatusNames.CONFLICT]: {
        message: "Conflict",
        status: 409,
    },
    [httpStatusNames.GONE]: {
        message: "Gone",
        status: 410,
    },
    [httpStatusNames.LENGTH_REQUIRED]: {
        message: "Length Required",
        status: 411,
    },
    [httpStatusNames.PRECONDITION_FAILED]: {
        message: "Precondition Failed",
        status: 412,
    },
    [httpStatusNames.PAYLOAD_TOO_LARGE]: {
        message: "Payload Too Large",
        status: 413,
    },
    [httpStatusNames.URI_TOO_LONG]: {
        message: "URI Too Long",
        status: 414,
    },
    [httpStatusNames.UNSUPPORTED_MEDIA_TYPE]: {
        message: "Unsupported Media Type",
        status: 415,
    },
    [httpStatusNames.RANGE_NOT_SATISFIABLE]: {
        message: "Range Not Satisfiable",
        status: 416,
    },
    [httpStatusNames.EXPECTATION_FAILED]: {
        message: "Expectation Failed",
        status: 417,
    },
    [httpStatusNames.IM_A_TEAPOT]: {
        message: "I'm a teapot",
        status: 418,
    },
    [httpStatusNames.MISDIRECTED_REQUEST]: {
        message: "Misdirected Request",
        status: 421,
    },
    [httpStatusNames.UNPROCESSABLE_ENTITY]: {
        message: "Unprocessable Entity",
        status: 422,
    },
    [httpStatusNames.LOCKED]: {
        message: "Locked",
        status: 423,
    },
    [httpStatusNames.FAILED_DEPENDENCY]: {
        message: "Failed Dependency",
        status: 424,
    },
    [httpStatusNames.UNORDERED_COLLECTION]: {
        message: "Unordered Collection",
        status: 425,
    },
    [httpStatusNames.UPGRADE_REQUIRED]: {
        message: "Upgrade Required",
        status: 426,
    },
    [httpStatusNames.PRECONDITION_REQUIRED]: {
        message: "Precondition Required",
        status: 428,
    },
    [httpStatusNames.TOO_MANY_REQUESTS]: {
        message: "Too Many Requests",
        status: 429,
    },
    [httpStatusNames.REQUEST_HEADER_FIELDS_TOO_LARGE]: {
        message: "Request Header Fields Too Large",
        status: 431,
    },
    [httpStatusNames.UNAVAILABLE_FOR_LEGAL_REASONS]: {
        message: "Unavailable For Legal Reasons",
        status: 451,
    },
    [httpStatusNames.INTERNAL_SERVER_ERROR]: {
        message: "Internal Server Error",
        status: 500,
    },
    [httpStatusNames.NOT_IMPLEMENTED]: {
        message: "Not Implemented",
        status: 501,
    },
    [httpStatusNames.BAD_GATEWAY]: {
        message: "Bad Gateway",
        status: 502,
    },
    [httpStatusNames.SERVICE_UNAVAILABLE]: {
        message: "Service Unavailable",
        status: 503,
    },
    [httpStatusNames.GATEWAY_TIMEOUT]: {
        message: "Gateway Timeout",
        status: 504,
    },
    [httpStatusNames.HTTP_VERSION_NOT_SUPPORTED]: {
        message: "HTTP Version Not Supported",
        status: 505,
    },
    [httpStatusNames.VARIANT_ALSO_NEGOTIATES]: {
        message: "Variant Also Negotiates",
        status: 506,
    },
    [httpStatusNames.INSUFFICIENT_STORAGE]: {
        message: "Insufficient Storage",
        status: 507,
    },
    [httpStatusNames.LOOP_DETECTED]: {
        message: "Loop Detected",
        status: 508,
    },
    [httpStatusNames.BANDWIDTH_LIMIT_EXCEEDED]: {
        message: "Bandwidth Limit Exceeded",
        status: 509,
    },
    [httpStatusNames.NOT_EXTENDED]: {
        message: "Not Extended",
        status: 510,
    },
    [httpStatusNames.NETWORK_AUTHENTICATION_REQUIRED]: {
        message: "Network Authentication Required",
        status: 511,
    },
};
