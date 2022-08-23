import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middlewares = [thunk];

const composeEnhancers =
    (process.env.NODE_ENV === "development" &&
        typeof window !== undefined &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export default createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
