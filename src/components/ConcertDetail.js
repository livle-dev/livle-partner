import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { fetchConcertDetail } from '../actions';
import Chart from './Chart';
import { map } from 'lodash';

import ProgressChart from './ProgressChart';

import moment from 'moment';
import Content from './Content';
import axios from '../actions/axios';

const DataInfo = ({ backgroundColor, text }) => {
  return (
    <div className="info-container _row-direction">
      <div className="circle" style={{ backgroundColor: backgroundColor }} />
      <p className="_white _fs_18">{text}</p>
    </div>
  );
};

class ConcertDetail extends Component {
  constructor({ concertList, match }) {
    super();

    const concertId = match.params.id;

    const concert = find(concertList, c => c.id == concertId); // object가 들어와있음
    // concert: object, id: string
    this.state = {
      concert: concert || { id: concertId },
      stats: null,
      fetched: false,
    };
    this.fetchConcertStats = this.fetchConcertStats.bind(this);
    this.renderDatainfo = this.renderDatainfo.bind(this);
    this.calculateBooked = this.calculateBooked.bind(this);
  }

  componentWillMount() {
    this.fetchConcertStats();
  }

  fetchConcertStats() {
    axios
      .get(`/ticket/${this.state.concert.id}/stats`)
      .then(res => {
        this.setState({ stats: res.data, fetched: true });

        console.log(this.state.stats);
      })
      .catch(err => console.log(err));
  }

  renderDatainfo(cancelled_at, checked_at) {
    // console.log(cancelled_at);
    if (cancelled_at !== null) {
      return <DataInfo backgroundColor="#d0021b" />;
    } else if (checked_at) {
      return <DataInfo backgroundColor="#4a90e2" />;
      // let start_at= moment(this.state.stats.start_at);
      // let now = moment();
      // if(start_at.diff(now, 'hours')>0){
      //     return (
      //         <DataInfo backgroundColor="#d0021b"/>
      //)
    }
  }
  calculateBooked() {
    const reservations = this.state.stats.reservations;
    console.log(reservations);
    var pureBooked = 0;
    for (var i = 0; i < reservations.length; i++) {
      console.log('hi');
      if (reservations[i].cancelled_at === null) {
        console.log(reservations[i].cancelled_at);
        pureBooked++;
      }
    }
    return pureBooked;
  }

  render() {
    const { concert, stats } = this.state;

    return concert ? (
      <div id="detail">
        <div className="password-container">
          <p className="_fs_48 _white">
            입장 비밀번호:{' '}
            <span className="_green-light">{concert.checkin_code}</span>
          </p>
        </div>
        <Content title="예약현황" backgroundColor="rgba(0, 0, 0, 0.58)">
          {stats && (
            <Chart
              start_at={this.state.stats.start_at}
              reservations={this.state.stats.reservations}
            />
          )}
        </Content>
        <Content title="예약자" backgroundColor="rgba(20, 42, 41, 0.58)">
          <div className="_flex_1 _column-direction">
            <div className="_flex _hright-position">
              <DataInfo backgroundColor="#4a90e2" text="이용완료" />
              {/*<DataInfo backgroundColor="#f8e71c" text="이용예정" />*/}
              <DataInfo backgroundColor="#d0021b" text="예매취소" />
            </div>
            <div className="_table-row _title">
              <div className="_flex_1">
                <div className="nickname text-cetner">예약자명</div>
                <div className="email text-cetner">닉네임</div>
              </div>
            </div>

            <div>
              {this.state.fetched ? (
                map(this.state.stats.reservations, u => (
                  <div key={u.id} className="_table-row _body">
                    <div className="_flex_1 _row-direction">
                      {this.renderDatainfo(u.cancelled_at, u.checked_at)}
                      <div className="nickname text-cetner">
                        {u.user.nickname}
                      </div>
                      <div className="email text-cetner">{u.user.email}</div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>데이터 로드 중</h2>
              )}
            </div>
          </div>

          <h1>예약자 수</h1>
          {this.state.fetched ? (
            <ProgressChart
              capacity={this.state.stats.capacity}
              booked={this.calculateBooked()}
            />
          ) : (
            <h2>차트 로드중</h2>
          )}
        </Content>

        {
          //콘서트 아이디: { concert.id }
          //제목 : { concert.title }
          // 이미지
          // <img src={concert.image} />
          // show other data...
        }
      </div>
    ) : (
      'TODO 데이터 가져오기'
    );
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList };
}

export default connect(mapStateToProps, { fetchConcertDetail })(ConcertDetail);
