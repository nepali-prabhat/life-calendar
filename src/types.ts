export type DataType = "past" | "current" | "future";
export type ViewType = "week" | "month" | "year";

export type Data = {
    number: number;
    type: DataType;
    year: string;
    age: number;
};

export type LifeCalendarControllers = {
    birthDay: Date;
    lifeExpectancy: number;
};
export type LifeCalendarData = LifeCalendarControllers & {
    deathDay: Date;

    totalNumberOfWeeksToLive: number;
    totalNumberOfMonthsToLive: number;
    totalNumberOfYearsToLive: number;

    currentWeek: number;
    currentMonth: number;
    currentYear: number;

    remainingWeeks: number;
    remainingMonths: number;
    remainingYears: number;

    weekData: Data[];
    monthData: Data[];
    yearData: Data[];
};
