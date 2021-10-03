import _ from "lodash";
import React, {
    MouseEvent,
    MouseEventHandler,
    useMemo,
    useRef,
    useState,
} from "react";
import { useResizeDetector } from "react-resize-detector";
import { LifeCalendarData, ViewType, DataType, Data } from "./types";

const Box: React.FC<{
    width: number;
    type: DataType;
    data: Data;
    onClick: (e: MouseEvent<HTMLDivElement>, data: Data) => void;
}> = ({ width, type, data, onClick }) => {
    return (
        <div
            className={`box box-${type}`}
            style={{ height: `${width}px`, width: `${width}px` }}
            onClick={e => onClick(e, data)}
        ></div>
    );
};

const MemoizedBox = React.memo(Box, (prevProps, nextProps) => {
    return (
        _.isEqual(prevProps.data, nextProps.data) &&
        prevProps.width === nextProps.width
    );
});

const ViewCalendar: React.FC<{
    view: ViewType;
    changeTooltipPosition: ({
        position: { bottom, right },
        data,
    }: {
        position: {
            bottom: number;
            right: number;
        };
        data: Data;
    }) => void;
    lifeCalendar?: LifeCalendarData;
}> = ({ view, lifeCalendar, changeTooltipPosition }) => {
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

    const onClick = (e: MouseEvent<HTMLDivElement>, data: Data) => {
        const { offsetTop, offsetLeft, offsetParent } =
            e.target as HTMLDivElement;
        const { offsetHeight, offsetWidth } = offsetParent as HTMLDivElement;
        const bottom = offsetHeight - offsetTop;
        const right = offsetWidth - offsetLeft;
        changeTooltipPosition({ position: { bottom, right }, data });
    };

    switch (view) {
        case "week":
            return (
                <div
                    ref={wrapperRef}
                    className={`view-calendar-wrapper view-${view}`}
                >
                    {lifeCalendar.weekData.map(weekData => (
                        <MemoizedBox
                            key={`week-number-${weekData.number}`}
                            width={boxWidth}
                            type={weekData.type}
                            data={weekData}
                            onClick={onClick}
                        />
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
                        <MemoizedBox
                            key={`week-number-${monthData.number}`}
                            width={boxWidth}
                            type={monthData.type}
                            data={monthData}
                            onClick={onClick}
                        />
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
                        <MemoizedBox
                            key={`week-number-${yearData.number}`}
                            width={boxWidth}
                            type={yearData.type}
                            data={yearData}
                            onClick={onClick}
                        />
                    ))}
                </div>
            );
    }
};

export default ViewCalendar;
