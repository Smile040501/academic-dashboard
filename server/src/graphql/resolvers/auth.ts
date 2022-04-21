import jwt from "jsonwebtoken";

import { getProfileInfo } from "../../utils/googleOAuth";
import { StudentModel } from "../../models";
import { ADMIN_EMAIL } from "./common";

const login = async (args: { email: string; tokenId: string }, _: Request) => {
    try {
        const { email, tokenId } = args;

        const student = await StudentModel.findOne({ email });
        // TODO: Uncomment it for production
        // if (!student && ADMIN_EMAIL !== email) {
        //     throw new Error("Student account not found!");
        // }

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
            throw new Error("Google OAuth token is invalid!");
        }

        const token = jwt.sign({ email: payload.email }, process.env.JWT_KEY!, {
            expiresIn: "1h",
        });

        return { token, tokenExpiration: 3600 };
    } catch (error) {
        throw error;
    }
};

export default { login };
