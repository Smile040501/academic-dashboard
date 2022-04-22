import jwt from "jsonwebtoken";

import { getProfileInfo } from "../../utils/googleOAuth";
import { StudentModel } from "../../models";
import {
    ADMIN_EMAIL,
    JWT_ACCESS_TOKEN_EXPIRATION,
    JWT_ACCESS_TOKEN_EXPIRATION_STR,
} from "../../utils/constants";
import { httpStatusNames, httpStatusTypes } from "../../utils/httpStatus";
import { HttpError } from "../../interfaces/HttpError";

const login = async (args: { email: string; tokenId: string }, _: Request) => {
    try {
        const { email, tokenId } = args;

        const student = await StudentModel.findOne({ email });
        if (
            process.env.NODE_ENV !== "development" &&
            !student &&
            ADMIN_EMAIL !== email
        ) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }

        const payload = await getProfileInfo(tokenId);
        /*
            payload = {
                email:
                email_verified:
                name:
                picture:
                given_name:
                family_name:
            }
        */

        if (!payload) {
            const un = httpStatusTypes[httpStatusNames.UNAUTHORIZED];
            const error = new HttpError(un.message, un.status);
            throw error;
        }

        const token = jwt.sign({ email: payload.email }, process.env.JWT_KEY!, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_STR,
        });

        return { token, tokenExpiration: JWT_ACCESS_TOKEN_EXPIRATION };
    } catch (error) {
        throw error;
    }
};

export default { login };
