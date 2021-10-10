import { State } from "../@types/";
import { lifeCalendarUndefinedError } from "../constants";
import deathDaySelector from "./deathDaySelector";
import { getSubFnForView } from "../utils/viewFunctionsMappings";

const totalBoxesSelector = (state: State): number => {
    if (!state.lifeCalendarControllers) throw lifeCalendarUndefinedError;
    const {
        view,
        lifeCalendarControllers: { birthDay },
    } = state;
    const deathDate = deathDaySelector(state)!;

    return getSubFnForView(view)(deathDate, birthDay);
};

export default totalBoxesSelector;
