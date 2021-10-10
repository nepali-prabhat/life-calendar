import { applyMiddleware, createStore } from "redux";
import appReducer from "./reducers/app";
import multi from "./redux-middleware/multi";

if (!appReducer) {
    throw new Error(
        "appReducer is undefined. This probably means there is a circular import."
    );
}

export const store = createStore(appReducer, applyMiddleware(multi));
