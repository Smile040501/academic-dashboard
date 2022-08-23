import {
    SET_LOGGED_IN_USER,
    SET_LOGIN,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
} from "redux/types";

const initialState = {
    loggedIn: false,
    user: null,
    token: null,
    email: "",
    isAdmin: false,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN: {
            return {
                ...state,
                loggedIn: action.payload,
            };
        }
        case SET_LOGGED_IN_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case AUTH_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
                email: action.payload.email,
                isAdmin:
                    action.payload.email === process.env.REACT_APP_ADMIN_EMAIL,
            };
        }
        case AUTH_LOGOUT: {
            return {
                loggedIn: false,
                user: null,
                token: null,
                email: "",
                isAdmin: false,
            };
        }
        default:
            return state;
    }
}
