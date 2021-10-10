import { Middleware, Dispatch } from "redux";
import { State } from "../@types/";

type MultiMiddleware = Middleware<any, State, Dispatch>;

/** Redux middleware that adds support for arrays of action. **/
const multi: MultiMiddleware =
    ({ dispatch }) =>
    next =>
    action =>
        Array.isArray(action)
            ? action.filter(Boolean).map(dispatch)
            : next(action);

export default multi;
