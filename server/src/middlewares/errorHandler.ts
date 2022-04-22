import { ErrorRequestHandler } from "express";

import { httpStatusNames, httpStatusTypes } from "../utils/httpStatus";

const errorHandler: ErrorRequestHandler = (err, _, res, _2) => {
    console.log(err);
    const ise = httpStatusTypes[httpStatusNames.INTERNAL_SERVER_ERROR];
    const status = err.status || ise.status;
    const message = err.message || ise.message;
    const data = err?.data;
    res.status(status).json({ message, data });
};

export default errorHandler;
