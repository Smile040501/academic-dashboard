import axios from "axios";
import { ThumbDownAltOutlined } from "@material-ui/icons";

import { setLoggedInUser, setLogin } from "redux/actions/auth";
import { openSnackbar } from "redux/actions/snackbar";
import store from "redux/store";

import { loginQuery } from "../graphql/auth";

const refreshConfig = () => ({
    grant_type: "refresh_token",
    client_id: process.env.REACT_APP_BCID,
    client_secret: process.env.REACT_APP_BSEC,
    refresh_token: localStorage.getItem("refresh_token"),
});

function axiosRefreshAuthTokenInterceptor() {
    const interceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (!error?.response?.status) {
                return Promise.reject(error);
            }
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }
            axios.interceptors.response.eject(interceptor);

            return axios
                .post("users/token", refreshConfig())
                .then((response) => {
                    error.response.config.headers["Authorization"] =
                        "Bearer " + response.data.access_token;
                    localStorage.setItem(
                        "access_token",
                        response.data.access_token
                    );
                    localStorage.setItem(
                        "refresh_token",
                        response.data.refresh_token
                    );
                    return axios(error.response.config);
                })
                .catch((error) => {
                    store.dispatch(
                        openSnackbar({
                            message: "Authentication failed! Login again.",
                            icon: ThumbDownAltOutlined,
                            color: "danger",
                        })
                    );
                    localStorage.clear();
                    store.dispatch(setLogin(false));
                    store.dispatch(setLoggedInUser(null));
                    return Promise.reject(error);
                })
                .finally(axiosRefreshAuthTokenInterceptor);
        }
    );
}

// axiosRefreshAuthTokenInterceptor();

function isLoggedIn() {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    return (
        localStorage.getItem("token") !== null && expirationDate > new Date()
    );
}

const convertToJWT = async (email, tokenId) => {
    try {
        let response = await axios.post("", loginQuery(email, tokenId));
        const { token, tokenExpiration } = response.data.data.login;
        const expirationDate = new Date(
            new Date().getTime() + tokenExpiration * 1000
        );
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("email", email);
        return { token, tokenExpiration };
    } catch (e) {
        throw e;
    }
};

async function refreshJWT() {
    try {
        const response = await axios.post(`users/token`, refreshConfig());
        const { access_token, refresh_token } = response.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return response.data;
    } catch (e) {
        console.log("refresh", e);
    }
}

export { convertToJWT, isLoggedIn, refreshJWT };
