import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from "redux/types";

export const openSnackbar = (snackbarProps) => ({
    type: OPEN_SNACKBAR,
    payload: {
        snackbarProps,
        snackbarOpen: true,
    },
});

export const closeSnackbar = () => ({
    type: CLOSE_SNACKBAR,
    payload: {
        snackbarOpen: false,
    },
});
