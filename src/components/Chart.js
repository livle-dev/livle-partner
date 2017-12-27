import React from 'react';
import ChartJS from 'chart.js';
import moment from 'moment';
import { filter, groupBy, map } from 'lodash';

export default class Chart extends React.Component {
  state = { sellInfo: null };

  constructor() {
    super();
    this.renderChart = this.renderChart.bind(this)
  }

  updateSellInfo = () => {
    const { start_at, reservations } = this.props;

    const getDday = time => {
      const start = moment(start_at);
      const data = moment(time);
      return start.diff(data, 'days');
    };

    const soldOn = groupBy(reservations, item => 7 - getDday(item.created_at));
    const cancelled = filter(reservations, item => !!item.cancelled_at);
    const cancelledOn = groupBy(cancelled, item => 7 - getDday(item.cancelled_at));

    const sellInfo = map(Array(8).fill(0),
      (v, index) => (soldOn[index] && soldOn[index].length) || 0);
    const cancelInfo = map(Array(8).fill(0),
      (v, index) => (cancelledOn[index] && cancelledOn[index].length) || 0);

    this.renderChart(sellInfo, cancelInfo);
  };

  renderChart(sellInfo, cancelInfo) {
    const ctx = this.refs['chart'].getContext('2d');
    var gradientSell = ctx.createLinearGradient(500, 0, 100, 0);
    gradientSell.addColorStop(0, '#45EAAD');
    gradientSell.addColorStop(1, '#A7D456');

    var gradientStroke2 = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke2.addColorStop(0, '#FF3D73');
    gradientStroke2.addColorStop(1, '#FFBE57');

    const sell = {
      label: '판매',
      data: sellInfo,
      lineTension: 0,
      borderColor: gradientSell,
      pointBorderColor: gradientSell,
      pointHoverBackgroundColor: gradientSell,
      pointHoverBorderColor: gradientSell,
      pointBackgroundColor: '#74DF83',
      // pointBorderWidth: 3,
      pointHoverRadius: 10,
      pointHoverBorderWidth: 1,
      pointRadius: 3,
      // fill: false,
      borderWidth: 6,

        // strokeColor: '#000',
        // pointColor: '#000',

    };

    const cancel = {
      label: '취소',
      data: cancelInfo,
      lineTension: 0,
      borderColor: gradientStroke2,
      pointBorderColor: gradientStroke2,
      pointBackgroundColor: '#FF8064',
      pointHoverBackgroundColor: gradientStroke2,
      pointHoverBorderColor: gradientStroke2,
      // pointBorderWidth: 0,
      pointHoverRadius: 10,

      pointRadius: 3,
      // fill: false,
      borderWidth: 6,

        // strokeColor: '#000',
        // pointColor: '#000',

    };
    const chartOptions = {
        legend: {
            display: true,
            position: "top",
            fullWidth: true,
            labels: {
                boxWidth: 15,
                fontSize: 18
            }
        },
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
          position: 'average',
        titleFontSize:0,
        bodyFontSize: 20,
          bodySpacing: 5
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

  componentDidMount() {
    this.updateSellInfo();
  }

  render() {
    return (
      <div style={{ width: 1040, height: 520 }}>
        <canvas ref="chart" />
      </div>
    );
  }
}
