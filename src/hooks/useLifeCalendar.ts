import { useState } from "react";

import { LifeCalendarData } from "../types";
import { calculateLifeCalendarData } from "../utils/calendarDataCalculator";

const useLifeCalendar = (birthDay: Date, lifeExpectancy: number) => {
    const [lifeCalendar] = useState<LifeCalendarData>(
        calculateLifeCalendarData(birthDay, lifeExpectancy)
    );

    return { lifeCalendar };
};
export default useLifeCalendar;
