import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from "redux/types";

const initialState = {
    snackbarProps: {
        message: undefined,
        color: undefined,
        close: undefined,
        icon: undefined,
        place: undefined,
        open: undefined,
        closeNotification: undefined,
        timeout: undefined,
    },
    snackbarOpen: false,
};

export default function snackbar(state = initialState, action) {
    switch (action.type) {
        case OPEN_SNACKBAR:
        case CLOSE_SNACKBAR: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
