import React from 'react';
import ChartJS from 'chart.js';

// import {fetchConcerts} from '../actions/index';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reservations: [] };
    console.log(this.props.reservations);
  }

  componentDidMount() {
    const ctx = this.refs['chart'].getContext('2d');
    var gradientSell = ctx.createLinearGradient(500, 0, 100, 0);
    gradientSell.addColorStop(0, '#FF3D73');
    gradientSell.addColorStop(1, '#FFBE57');

    var gradientStroke2 = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke2.addColorStop(0, '#45EAAD');
    gradientStroke2.addColorStop(1, '#A7D456');

    const sell = {
      label: '판매',
      data: [0, 59, 75, 20, 20, 55, 40],
      lineTension: 0,
      borderColor: gradientSell,
      pointBorderColor: gradientSell,
      pointHoverBackgroundColor: gradientSell,
      pointHoverBorderColor: gradientSell,
      // pointBackgroundColor: '#fff',
      pointBorderWidth: 3,
      pointHoverRadius: 10,
      pointHoverBorderWidth: 1,
      pointRadius: 3,
      fill: false,
      borderWidth: 3,
    };

    const cancel = {
      label: '취소',
      data: [20, 15, 60, 60, 65, 30, 70],
      lineTension: 0,
      borderColor: gradientStroke2,
      pointBorderColor: gradientStroke2,
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: gradientStroke2,
      pointHoverBorderColor: gradientStroke2,
      pointBorderWidth: 3,
      pointHoverRadius: 10,

      pointRadius: 3,
      fill: false,
      borderWidth: 4,
    };
    const chartOptions = {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { fontSize: 19 },
          },
        ],
        yAxes: [{ gridLines: { display: false } }],
      },
      tooltips: {
        mode: 'x-axis',
        backgroundColor: '#42505b',
        // titleFontSize:10,
        // bodyFontSize: 10
      },
    };

    this.chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: [
          'D - 7',
          'D - 6',
          'D - 5',
          'D - 4',
          'D - 3',
          'D - 2',
          'D - 1',
          'D - 0',
        ],
        datasets: [sell, cancel],
      },
      options: chartOptions,
    });
  }
  render() {
    return (
      <div style={{ width: 1040, height: 520 }}>
        <canvas ref="chart" />
      </div>
    );
  }
}
