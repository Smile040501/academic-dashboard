import {
    SET_LOGGED_IN_USER,
    SET_LOGIN,
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
} from "redux/types";

export const setLogin = (isLoggedIn) => ({
    type: SET_LOGIN,
    payload: isLoggedIn,
});

export const setLoggedInUser = (user) => ({
    type: SET_LOGGED_IN_USER,
    payload: user,
});

export const authSuccess = (token, email) => ({
    type: AUTH_SUCCESS,
    payload: { token, email },
});

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("email");
    return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => (dispatch, getState) => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationTime * 1000);
};

export const authCheckState = () => (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            const email = localStorage.getItem("email");
            dispatch(authSuccess(token, email));
            dispatch(
                checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
};
