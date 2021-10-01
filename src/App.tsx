import React, { useState } from "react";
import { parse } from "date-fns";
import classNames from "classnames";

import ViewInfo from "./ViewInfo";
import { ViewType } from "./types";
import { LIFE_EXPECTANCY, BIRTH_DAY } from "./constants";
import ViewCalendar from "./ViewCalendar";
import useLifeCalendar from "./hooks/useLifeCalendar";

const App: React.FC = () => {
    const [lifeExpectancy] = useState<number>(LIFE_EXPECTANCY);
    const [birthDay] = useState<Date>(
        parse(BIRTH_DAY, "yyyy-MM-dd", new Date())
    );
    const [view, setView] = useState<ViewType>("week");
    const { lifeCalendar } = useLifeCalendar(birthDay, lifeExpectancy);

    return (
        <div className="app">
            <div className="grid grid--center">
                <div className="3/4--lap-and-up grid__cell mb-5">
                    <div className="mb-4 mt-5 text-center">
                        <h1>Life Calendar - {lifeExpectancy}</h1>
                        <div className="view-button-group">
                            <button
                                className={classNames({
                                    "active-view": view === "week",
                                })}
                                onClick={() => setView("week")}
                            >
                                Week
                            </button>
                            <button
                                className={classNames({
                                    "active-view": view === "month",
                                })}
                                onClick={() => setView("month")}
                            >
                                Month
                            </button>
                            <button
                                className={classNames({
                                    "active-view": view === "year",
                                })}
                                onClick={() => setView("year")}
                            >
                                Year
                            </button>
                        </div>
                    </div>
                    <ViewInfo view={view} lifeCalendar={lifeCalendar} />
                    <ViewCalendar view={view} lifeCalendar={lifeCalendar} />
                </div>
            </div>
        </div>
    );
};

export default App;
