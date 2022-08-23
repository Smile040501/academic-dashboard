import { SET_HEADING } from "redux/types";

const initialState = "";

export default function heading(state = initialState, action) {
    switch (action.type) {
        case SET_HEADING: {
            return action.payload;
        }
        default:
            return state;
    }
}
