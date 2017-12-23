import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { fetchConcertDetail } from '../actions';
import Chart from './Chart';

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
    this.state = { concert: concert || { id: concertId }, stats: {} };
    this.fetchConcertStats = this.fetchConcertStats.bind(this);
    // TODO
    // fetchConcertDetail(id)....
  }

  componentWillMount() {
    this.fetchConcertStats();
  }

  fetchConcertStats() {
    axios
      .get(`/ticket/${this.state.concert.id}/stats`)
      .then(res => {
        console.log(res.data);
        this.setState({ stats: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const concert = this.state.concert;
    return concert ? (
      <div id="detail">
        <div className="password-container">
          <p className="_fs_48 _white">
            입장 비밀번호:{' '}
            <span className="_green-light">{concert.checkin_code}</span>
          </p>
        </div>
        <Content title="예약현황" backgroundColor="rgba(0, 0, 0, 0.58)">
          <Chart
            start_at={this.state.stats.start_at}
            reservations={this.state.stats.reservations}
          />
        </Content>
        <Content title="예약자" backgroundColor="rgba(20, 42, 41, 0.58)">
          <div className="_flex_1 _column-direction">
            <div className="_flex _hright-position">
              <DataInfo backgroundColor="#4a90e2" text="이용완료" />
              <DataInfo backgroundColor="#f8e71c" text="이용예정" />
              <DataInfo backgroundColor="#d0021b" text="예매취소" />
            </div>
            <div className="_table-row _title">
              <div className="_flex_1">
                <div className="nickname text-cetner">예약자명</div>
                <div className="email text-cetner">닉네임</div>
              </div>
            </div>
            <div className="_table-row _body">
              <div className="_flex_1">
                <div className="nickname text-cetner">TODO</div>
                <div className="email text-cetner">TODO</div>
              </div>
            </div>
          </div>
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
