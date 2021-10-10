import { curryRight } from "lodash";
import { State } from "../@types";
import { LifeCalendarControllers } from "../@types/lifeCalendarControllers";

const setControllers = (
    state: State,
    { birthDay, lifeExpectancy }: LifeCalendarControllers
): State => {
    return { ...state, lifeCalendarControllers: { birthDay, lifeExpectancy } };
};

export default curryRight(setControllers);
