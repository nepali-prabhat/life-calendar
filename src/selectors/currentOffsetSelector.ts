import { State } from "../@types";
import { lifeCalendarUndefinedError } from "../constants";
import { getSubFnForView } from "../utils/viewFunctionsMappings";

const currentOffsetSelector = (state: State): number => {
    if (!state.lifeCalendarControllers) throw lifeCalendarUndefinedError;
    const {
        view,
        lifeCalendarControllers: { birthDay },
    } = state;

    const currentOffset = getSubFnForView(view)(new Date(), birthDay);
    return currentOffset;
};

export default currentOffsetSelector;
