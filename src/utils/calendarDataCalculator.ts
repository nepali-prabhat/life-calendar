import {
    addYears,
    differenceInWeeks,
    addWeeks,
    format,
    differenceInYears,
    differenceInMonths,
    addMonths,
} from "date-fns";
import _, { curryRight, range, map } from "lodash";

import { LifeCalendarData, Data, DataType, ViewType } from "../types";

const calculateType = (
    dataFor: ViewType,
    { birthDay, boxNumber }: { birthDay: Date; boxNumber: number }
): DataType => {
    const differenceFn = {
        week: differenceInWeeks,
        month: differenceInMonths,
        year: differenceInYears,
    };
    const currentWeekNumber = differenceFn[dataFor](new Date(), birthDay);
    if (boxNumber > currentWeekNumber) return "future";
    if (boxNumber < currentWeekNumber) return "past";
    // week
    return "current";
};

const calculateViewData = curryRight(
    (boxNumber: number, dataFor: ViewType, birthDay: Date): Data => {
        const addFn = {
            week: addWeeks,
            month: addMonths,
            year: addYears,
        };
        const type = calculateType(dataFor, { birthDay, boxNumber });
        const currentBoxDate = addFn[dataFor](birthDay, boxNumber);
        const year = format(currentBoxDate, "yyyy");
        const age = differenceInYears(currentBoxDate, birthDay);
        return {
            number: boxNumber,
            type,
            year,
            age,
        };
    }
);

const viewDataCalculator = curryRight(
    (dataFor: ViewType, totalBoxes: number, birthDay: Date) => {
        const dataCalculator = calculateViewData(birthDay)(dataFor);
        return map(range(totalBoxes), boxNumber => dataCalculator(boxNumber));
    }
);

const calculateTotalNumberOfBoxes = curryRight(
    (
        dataFor: ViewType,
        { birthDay, deathDay }: { birthDay: Date; deathDay: Date }
    ) => {
        const subFn = {
            week: differenceInWeeks,
            month: differenceInMonths,
            year: differenceInYears,
        };
        return subFn[dataFor](deathDay, birthDay);
    }
);

export const calculateLifeCalendarData = (
    birthDay: Date,
    lifeExpectancy: number
): LifeCalendarData => {
    const deathDay = addYears(birthDay, lifeExpectancy);

    const currentWeek = differenceInWeeks(new Date(), birthDay);
    const currentMonth = differenceInMonths(new Date(), birthDay);
    const currentYear = differenceInYears(new Date(), birthDay);

    const numberOfBoxesCalculator = calculateTotalNumberOfBoxes({
        birthDay,
        deathDay,
    });
    const [numberOfWeekBoxes, numberOfMonthsBoxes, numberOfYearsBoxes] = [
        numberOfBoxesCalculator("week"),
        numberOfBoxesCalculator("month"),
        numberOfBoxesCalculator("year"),
    ];

    const dataCalculator = viewDataCalculator(birthDay);
    const [weekData, monthData, yearData] = [
        dataCalculator(numberOfWeekBoxes)("week"),
        dataCalculator(numberOfMonthsBoxes)("month"),
        dataCalculator(numberOfYearsBoxes)("year"),
    ];

    return {
        birthDay,
        lifeExpectancy,

        deathDay,

        totalNumberOfWeeksToLive: numberOfWeekBoxes,
        totalNumberOfMonthsToLive: numberOfMonthsBoxes,
        totalNumberOfYearsToLive: numberOfYearsBoxes,

        currentWeek,
        currentMonth,
        currentYear,

        remainingWeeks: numberOfWeekBoxes - currentWeek,
        remainingMonths: numberOfMonthsBoxes - currentMonth,
        remainingYears: numberOfYearsBoxes - currentYear,

        weekData,
        monthData,
        yearData,
    };
};
