import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";

const verifyJWT: RequestHandler = (
    req: Request & { isAuth?: boolean; email?: string },
    _,
    next
) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    if (!authHeader.startsWith("Bearer ")) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(
            token,
            process.env.JWT_KEY!
        ) as jwt.AuthorizationJWTPayload;
    } catch (error) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.email = decodedToken.email;
    next();
};

export default verifyJWT;
