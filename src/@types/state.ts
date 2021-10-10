import { LifeCalendarControllers } from "./lifeCalendarControllers";
import { ViewType } from "./viewType";

export type State = {
    lifeCalendarControllers?: LifeCalendarControllers;
    view: ViewType;
};
