import React from 'react';
import ChartJS from 'chart.js';
import moment from 'moment';
import { filter, groupBy, map } from 'lodash';

const barOptions = {
  lineTension: 0,
  pointHoverRadius: 10,
  pointHoverBorderWidth: 1,
  pointRadius: 2,
  borderWidth: 4,
};

const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'top',
    fullWidth: true,
    labels: {
      boxWidth: 32,
      fontSize: 16,
      padding: 24,
      fontColor: '#fff',
    },
  },
  scales: {
    xAxes: [{ gridLines: { display: false } }],
    yAxes: [
      { gridLines: { display: true, color: 'rgba(128, 128, 128, 0.3)' } },
    ],
  },
  tooltips: {
    mode: 'x-axis',
    backgroundColor: '#42505b',
    position: 'average',
    titleFontSize: 0,
    bodyFontSize: 16,
    bodySpacing: 8,
  },
};

export default class Chart extends React.Component {
  constructor() {
    super();
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.updateSellInfo();
  }

  updateSellInfo() {
    const { start_at, reservations } = this.props;
    const start = moment(start_at).startOf('date');

    const getDday = time => {
      const data = moment(time).startOf('date');
      return start.diff(data, 'days');
    };

    const soldOn = groupBy(reservations, item => 7 - getDday(item.created_at));
    const cancelled = filter(reservations, item => item.cancelled_at);
    const cancelledOn = groupBy(
      cancelled,
      item => 7 - getDday(item.cancelled_at)
    );

    const sellInfo = map(
      Array(8).fill(0),
      (v, index) => (soldOn[index] && soldOn[index].length) || 0
    );
    const cancelInfo = map(
      Array(8).fill(0),
      (v, index) => (cancelledOn[index] && cancelledOn[index].length) || 0
    );

    this.renderChart(sellInfo, cancelInfo, start_at);
  }

  renderChart(sellInfo, cancelInfo, start_at) {
    const ctx = this.chart.getContext('2d');
    const gradientSell = ctx.createLinearGradient(500, 0, 100, 0);
    gradientSell.addColorStop(0, '#45EAAD');
    gradientSell.addColorStop(1, '#A7D456');

    const gradientCancel = ctx.createLinearGradient(500, 0, 100, 0);
    gradientCancel.addColorStop(0, '#FF3D73');
    gradientCancel.addColorStop(1, '#FFBE57');

    let labels = [];
    for (let i = 7; i >= 0; i--)
      labels.push(
        moment(start_at)
          .subtract(i, 'days')
          .format('MM/DD')
      );

    const sell = {
      label: '판매',
      data: sellInfo,
      borderColor: gradientSell,
      pointBorderColor: gradientSell,
      pointHoverBackgroundColor: gradientSell,
      pointHoverBorderColor: gradientSell,
      pointBackgroundColor: '#74DF83',
      ...barOptions,
    };

    const cancel = {
      label: '취소',
      data: cancelInfo,
      borderColor: gradientCancel,
      pointBorderColor: gradientCancel,
      pointHoverBackgroundColor: gradientCancel,
      pointHoverBorderColor: gradientCancel,
      pointBackgroundColor: '#FF8064',
      ...barOptions,
    };

    // render Chart
    return new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [sell, cancel],
      },
      options: chartOptions,
    });
  }

  render() {
    return (
      <div className="_flex_1">
        <canvas ref={c => (this.chart = c)} />
      </div>
    );
  }
}
