import { curryRight } from "lodash";
import { ViewType, State } from "../@types";

const setView = (state: State, { view }: { view: ViewType }): State => ({
    ...state,
    view,
});

export default curryRight(setView);
