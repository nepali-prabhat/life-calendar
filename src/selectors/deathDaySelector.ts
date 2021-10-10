import { addYears } from "date-fns";
import { lifeCalendarUndefinedError } from "../constants";
import { State } from "../@types";

const deathDaySelector = (state: State): Date => {
    if (!state.lifeCalendarControllers) throw lifeCalendarUndefinedError;
    const {
        lifeCalendarControllers: { birthDay, lifeExpectancy },
    } = state;
    return addYears(birthDay, lifeExpectancy);
};

export default deathDaySelector;
