import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";

import { setLoading } from "redux/actions/loading";
import { convertToJWT } from "services/auth";

function GoogleSignIn(props) {
    const { loginSuccess, loginFailed } = props;
    const dispatch = useDispatch();

    const handleGoogleSignInSuccess = async (responseGoogle) => {
        dispatch(setLoading(true));
        try {
            const profile = responseGoogle.profileObj;
            const { token, tokenExpiration } = await convertToJWT(
                profile.email,
                responseGoogle.tokenId
            );
            loginSuccess({ profile, token, tokenExpiration });
        } catch (e) {
            loginFailed(e);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGoogleSignInFailure = async (responseGoogle) => {
        loginFailed(responseGoogle);
    };

    return (
        <React.Fragment>
            <GoogleLogin
                clientId={process.env.REACT_APP_GCID}
                buttonText="Login with Google"
                onSuccess={handleGoogleSignInSuccess}
                onFailure={handleGoogleSignInFailure}
                onScriptLoadFailure={() => loginFailed("script_load_error")}
                theme="dark"
                cookiePolicy={"single_host_origin"}
            />
        </React.Fragment>
    );
}

export default GoogleSignIn;

/** Structure of response from Google
    responseGoogle = {
        accessToken:
        googleId:
        profileObj: {
            email:
            familyName:
            givenName:
            googleId:
            imageUrl:
            name:
        }
        tokenId:
        tokenObj: {
            access_token:
            expires_at:
            expires_in:
            token_type:
        }
    }
    */
