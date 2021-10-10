import { range } from "lodash";
import React from "react";
import { Data } from "./types";

const Tooltip: React.FC<{
    position: { bottom: number; right: number };
    data: Data;
}> = ({ position: { bottom, right }, data }) => {
    return (
        <div className="tooltip-container" style={{ bottom, right }}>
            <div>
                Tooltip: <br />
                {range(data.number / 52).map(() => `${data.year}`)}
            </div>
        </div>
    );
};

export default Tooltip;
