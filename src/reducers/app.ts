import { Action } from "redux";
import { Index, State } from "../@types";
import { initialState } from "../utils/initialState";
import * as reducers from "./index";
import unknownAction from "./unknownAction";

export default (state: State = initialState(), action: Action<string>): State =>
    ((reducers as Index<any>)[action.type] || unknownAction)(state, action);
