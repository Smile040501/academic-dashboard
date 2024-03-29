import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    /**
     * To get access_token and refresh_token in server side,
     * the data for redirect_uri should be postmessage.
     * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
     */
    "postmessage"
);

export const getProfileInfo = async (tokenId: string) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID!,
        });

        const payload = ticket.getPayload();

        return payload;
    } catch (error) {
        throw error;
    }
};
