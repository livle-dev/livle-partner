import React, { Component } from "react";
import CircularProgressbar from 'react-circular-progressbar';


const ProgressChart = (props) => {


    const percentage=props.booked ? (props.booked / props.capacity)*100 : 0;

    return (
        <div className="progress">
            <CircularProgressbar percentage={percentage} initialAnimation={true} strokeWidth={6} textForPercentage={(pct) => `${props.booked}/${props.capacity}`} />
        </div>
    );
};

export default ProgressChart



