import { format, differenceInYears } from "date-fns";
import { range, curry } from "lodash";
import { createSelector } from "reselect";

import { State, Data, DataType, ViewType } from "../@types";
import { lifeCalendarUndefinedError } from "../constants";
import { totalBoxesSelector } from "../selectors";
import {
    getSubFnForView,
    getAddFnForView,
} from "../utils/viewFunctionsMappings";

const calculateType = (
    view: ViewType,
    birthDay: Date,
    boxNumber: number
): DataType => {
    const currentWeekNumber = getSubFnForView(view)(new Date(), birthDay);
    if (boxNumber > currentWeekNumber) return "future";
    if (boxNumber < currentWeekNumber) return "past";
    return "current";
};

const getCurrentDate = (view: ViewType, birthDay: Date, offset: number) => {
    const currentDate = getAddFnForView(view)(birthDay, offset);
    return currentDate;
};

const getYear = (date: Date): string => format(date, "yyyy");

const getAge = (currentDate: Date, birthDay: Date) =>
    differenceInYears(currentDate, birthDay);

const calculateViewData = curry(
    (view: ViewType, birthDay: Date, offset: number): Data => {
        const type = calculateType(view, birthDay, offset);
        const currentDate = getCurrentDate(view, birthDay, offset);
        const year = getYear(currentDate);
        const age = getAge(currentDate, birthDay);
        return {
            offset,
            type,
            year,
            age,
        };
    }
);

const viewDataSelector = createSelector(
    (state: State) => state.view,
    (state: State) => state.lifeCalendarControllers,
    totalBoxesSelector,
    (view, lifeCalendarControllers, totalBoxes): Data[] => {
        if (!lifeCalendarControllers) throw lifeCalendarUndefinedError;

        const { birthDay } = lifeCalendarControllers;

        const viewDataGenerator = calculateViewData(view)(birthDay);
        const viewData = range(totalBoxes || 0).map(offset =>
            viewDataGenerator(offset)
        );
        return viewData;
    }
);

export default viewDataSelector;
