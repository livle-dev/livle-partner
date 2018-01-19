import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

const CountReservation = props => {
  const percentage = props.booked ? props.booked / props.capacity * 100 : 0;

  return (
    <div className="_full-absolute _flex_1 _hcenter-position _vcenter-position">
      <div className="count-reservation">
        <CircularProgressbar
          percentage={percentage}
          initialAnimation={true}
          strokeWidth={6}
          textForPercentage={pct => `${props.booked}/${props.capacity}`}
        />
      </div>
    </div>
  );
};

export default CountReservation;
