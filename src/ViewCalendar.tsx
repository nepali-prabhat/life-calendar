import React, { useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { LifeCalendarData, ViewType, DataType } from "./types";
import { BOX_SIZE } from "./constants";

const Box: React.FC<{ width: number; type: DataType }> = ({ width, type }) => {
    const boxSize = width;
    return (
        <div
            className={`box box-${type}`}
            style={{ height: `${boxSize}px`, width: `${boxSize}px` }}
        ></div>
    );
};

const ViewCalendar: React.FC<{
    view: ViewType;
    lifeCalendar?: LifeCalendarData;
}> = ({ view, lifeCalendar }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [width, setBoxWidth] = useState(0);

    const onResize = () => {
        const width = wrapperRef?.current?.getBoundingClientRect()?.width;
        setBoxWidth(width || 0);
    };

    useResizeDetector({
        onResize,
        targetRef: wrapperRef as React.MutableRefObject<unknown>,
    });

    if (!lifeCalendar) {
        return null;
    }
    const calculateBoxWidth = {
        week: () => (width - 8 * 51) / 52,
        month: () => (width - 16 * 23) / 24,
        year: () => (width - 24 * 9) / 10,
    };
    const boxWidth = calculateBoxWidth[view]();

    switch (view) {
        case "week":
            return (
                <div
                    ref={wrapperRef}
                    className={`view-calendar-wrapper view-${view}`}
                >
                    {lifeCalendar.weekData.map(weekData => (
                        <div key={`week-number-${weekData.number}`}>
                            <Box width={boxWidth} type={weekData.type} />
                        </div>
                    ))}
                </div>
            );
        case "month":
            return (
                <div
                    ref={wrapperRef}
                    className={`view-calendar-wrapper view-${view}`}
                >
                    {lifeCalendar.monthData.map(monthData => (
                        <div key={`week-number-${monthData.number}`}>
                            <Box width={boxWidth} type={monthData.type} />
                        </div>
                    ))}
                </div>
            );
        case "year":
            return (
                <div
                    ref={wrapperRef}
                    className={`view-calendar-wrapper view-${view}`}
                >
                    {lifeCalendar.yearData.map(yearData => (
                        <div key={`week-number-${yearData.number}`}>
                            <Box width={boxWidth} type={yearData.type} />
                        </div>
                    ))}
                </div>
            );
    }
};

export default ViewCalendar;
