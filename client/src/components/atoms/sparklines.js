import React from 'react';

import {
    Sparklines,
    SparklinesLine,
    SparklinesBars,
    SparklinesSpots,
} from 'react-sparklines';

export const SimpleLine = ({label, data}) => {
    return (
        <div className="sparkline">
            <div>{label}</div>
            <Sparklines data={data} margin={5}>
                < SparklinesLine color = "black" / >
                < SparklinesSpots / >
            </Sparklines>
        </div>
    );
};

export const SimpleBars = ({label, data}) => {
    return (
        <div className="sparkline">
            <div>{label}</div>
            <Sparklines data={data} margin={5}>
                < SparklinesBars color = "black" / >
                < SparklinesSpots / >
            </Sparklines>
        </div>
    );
}