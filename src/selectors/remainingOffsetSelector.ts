import { State } from "../@types";
import { lifeCalendarUndefinedError } from "../constants";
import { totalBoxesSelector, currentOffsetSelector } from "../selectors";

const remainingOffsetSelector = (state: State): number => {
    if (!state.lifeCalendarControllers) throw lifeCalendarUndefinedError;
    return totalBoxesSelector(state) - currentOffsetSelector(state) || 0;
};

export default remainingOffsetSelector;
