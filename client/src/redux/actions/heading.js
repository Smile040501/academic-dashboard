import { SET_HEADING } from "redux/types";

export const setHeading = (heading) => ({
    type: SET_HEADING,
    payload: heading,
});
