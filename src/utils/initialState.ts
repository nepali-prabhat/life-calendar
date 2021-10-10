import { State } from "../@types";

// TODO: get local storage calendar data
export const initialState = () => {
    const state: State = {
        view: "week",
    };
    return state;
};
