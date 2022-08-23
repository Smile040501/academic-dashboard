import { combineReducers } from "redux";

import auth from "./auth";
import heading from "./heading";
import loading from "./loading";
import snackbar from "./snackbar";

export default combineReducers({ snackbar, auth, loading, heading });
