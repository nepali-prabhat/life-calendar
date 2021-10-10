import { curryRight } from "lodash";
import { Action } from "redux";
import {State} from "../@types/";

const unknownAction = (state: State, action: Action<string>): State => {
    console.log("Unknown action: ", action.type, action);
    return state;
};

export default curryRight(unknownAction);
