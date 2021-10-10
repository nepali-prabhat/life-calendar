import React from "react";
import { getDate, getDay, format, lastDayOfMonth } from "date-fns";
import { getDayOfYear } from "date-fns";
import { lastDayOfYear } from "date-fns";
import { LifeCalendarData, ViewType } from "./types";

const ViewInfo: React.FC<{ view: ViewType; lifeCalendar?: LifeCalendarData }> =
    ({ view, lifeCalendar }) => {
        if (!lifeCalendar) {
            return null;
        }
        switch (view) {
            case "week":
                return (
                    <div className="card view-info grid grid--flush mb-4">
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "left" }}
                        >
                            <p>
                                Current week: {lifeCalendar?.currentWeek || "-"}{" "}
                                ({1 + +getDay(new Date())} / 7)
                            </p>
                        </div>
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "center" }}
                        >
                            <p>
                                {lifeCalendar?.currentWeek
                                    ? lifeCalendar.currentWeek - 1
                                    : "-"}{" "}
                                / {lifeCalendar?.totalNumberOfWeeksToLive}
                                {lifeCalendar &&
                                    " => " +
                                        (
                                            ((lifeCalendar.currentWeek - 1) /
                                                lifeCalendar.totalNumberOfWeeksToLive) *
                                            100
                                        ).toFixed(2) +
                                        "%"}
                            </p>
                        </div>
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "right" }}
                        >
                            <p>
                                Remaining weeks:{" "}
                                {lifeCalendar?.remainingWeeks || "-"}
                            </p>
                        </div>
                    </div>
                );
            case "month":
                return (
                    <div className="card view-info grid grid--flush mb-4">
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "left" }}
                        >
                            <p>
                                Current month:{" "}
                                {lifeCalendar?.currentMonth || "-"} (
                                {getDate(new Date())} /{" "}
                                {format(lastDayOfMonth(new Date()), "dd")})
                            </p>
                        </div>
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "center" }}
                        >
                            <p>
                                {lifeCalendar?.currentMonth
                                    ? lifeCalendar.currentMonth - 1
                                    : "-"}{" "}
                                / {lifeCalendar?.totalNumberOfMonthsToLive}
                                {lifeCalendar &&
                                    " => " +
                                        (
                                            ((lifeCalendar.currentMonth - 1) /
                                                lifeCalendar.totalNumberOfMonthsToLive) *
                                            100
                                        ).toFixed(2) +
                                        "%"}
                            </p>
                        </div>
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "right" }}
                        >
                            <p>
                                Remaining months:{" "}
                                {lifeCalendar?.remainingMonths || "-"}
                            </p>
                        </div>
                    </div>
                );
            case "year":
                return (
                    <div className="card view-info grid grid--flush mb-4">
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "left" }}
                        >
                            <p>
                                Current year: {lifeCalendar?.currentYear || "-"}{" "}
                                ({getDayOfYear(new Date())} /{" "}
                                {getDayOfYear(lastDayOfYear(new Date()))})
                            </p>
                        </div>
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "center" }}
                        >
                            <p>
                                {lifeCalendar?.currentYear
                                    ? lifeCalendar.currentYear - 1
                                    : "-"}{" "}
                                / {lifeCalendar?.totalNumberOfYearsToLive}
                                {lifeCalendar &&
                                    " => " +
                                        (
                                            ((lifeCalendar.currentYear - 1) /
                                                lifeCalendar.totalNumberOfYearsToLive) *
                                            100
                                        ).toFixed(2) +
                                        "%"}
                            </p>
                        </div>
                        <div
                            className="1/3 grid__cell"
                            style={{ textAlign: "right" }}
                        >
                            <p>
                                Remaining years:{" "}
                                {lifeCalendar?.remainingYears || "-"}
                            </p>
                        </div>
                    </div>
                );
        }
    };
export default ViewInfo;
