import {
    addWeeks,
    addMonths,
    addYears,
    differenceInWeeks,
    differenceInYears,
    differenceInMonths,
} from "date-fns";
import { ViewType } from "../@types";

const subFn = {
    week: differenceInWeeks,
    month: differenceInMonths,
    year: differenceInYears,
};

const addFn = {
    week: addWeeks,
    month: addMonths,
    year: addYears,
};

export const getSubFnForView = (view: ViewType) => subFn[view];
export const getAddFnForView = (view: ViewType) => addFn[view];
