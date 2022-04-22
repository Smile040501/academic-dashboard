import rateLimit from "express-rate-limit";

import { MAX_REQUESTS, WINDOW_MS } from "../utils/constants";
import { httpStatusNames, httpStatusTypes } from "../utils/httpStatus";

const tmr = httpStatusTypes[httpStatusNames.TOO_MANY_REQUESTS];

const rateLimitHandler = rateLimit({
    max: MAX_REQUESTS, // limit each IP for requests per windowMs
    windowMs: WINDOW_MS,
    message: tmr.message, // Error message sent to user when max is exceeded
});

export default rateLimitHandler;
