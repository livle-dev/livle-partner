import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import moment from 'moment';
import { fetchConcertDetail } from '../../actions';
import axios from '../../actions/axios';
// view
import Chart from './Chart';
import CountReservation from './CountReservation';
import Loading from '../Loading';
import Content from '../Content';

const calculateBooked = reservations =>
  reservations.filter(item => !item.cancelled_at).length;

const DataInfo = ({ backgroundColor, text }) => {
  return (
    <div className="info-container _row-direction">
      <div className="circle" style={{ backgroundColor: backgroundColor }} />
      <p className="_white _fs_18">{text}</p>
    </div>
  );
};

const UserStatus = (checked_at = null, cancelled_at = null) => {
  if (checked_at) return <DataInfo backgroundColor="#4a90e2" />;
  if (cancelled_at) return <DataInfo backgroundColor="#d0021b" />;
  return <DataInfo backgroundColor="transparent" />;
};

class ConcertDetail extends Component {
  constructor() {
    super();
    this.state = { stats: null };

    this.fetchConcertStats = this.fetchConcertStats.bind(this);
  }

  componentWillMount() {
    this.fetchConcertStats();
  }

  fetchConcertStats() {
    const { match } = this.props;
    axios
      .get(`/ticket/${match.params.id}/stats`)
      .then(res => this.setState({ stats: res.data }))
      .catch(err => Promise.reject(err.response));
  }

  render() {
    const { stats } = this.state;

    return stats ? (
      <div id="detail">
        <div className="password-container">
          <p className="_fs_48 _white">
            {'입장 비밀번호: '}
            <span className="_green-light">{stats.checkin_code}</span>
          </p>
        </div>
        <Content title="예약현황" backgroundColor="rgba(0, 0, 0, 0.58)">
          <Chart start_at={stats.start_at} reservations={stats.reservations} />
        </Content>
        <div className="_flex _row-direction">
          <div className="_flex_1">
            <Content title="예약자" backgroundColor="#051716">
              <div className="_flex_1 _column-direction">
                <div className="_flex _hright-position">
                  <DataInfo backgroundColor="#4a90e2" text="이용완료" />
                  <DataInfo backgroundColor="#d0021b" text="예매취소" />
                </div>
                <div className="table-container _table-row _title">
                  <div className="_flex_1">
                    {UserStatus()}
                    <div className="nickname _text-center">예약자명</div>
                    <div className="email _text-center">닉네임</div>
                  </div>
                </div>
                {stats.reservations.map(user => (
                  <div key={user.id} className="_table-row _body">
                    <div className="_flex_1 _row-direction">
                      {UserStatus(user.checked_at, user.cancelled_at)}
                      <div className="nickname _text-center">
                        {user.user.nickname}
                      </div>
                      <div className="email _text-center">
                        {user.user.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Content>
          </div>

          <div className="count-reservation-container">
            <Content title="예약자 수" backgroundColor="#142a29">
              <div className="_flex _hcenter-position _vcenter-position">
                <CountReservation
                  capacity={stats.capacity}
                  booked={calculateBooked(stats.reservations)}
                />
              </div>
            </Content>
          </div>
        </div>
      </div>
    ) : (
      <Loading fullscreen />
    );
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList };
}

export default connect(mapStateToProps, { fetchConcertDetail })(ConcertDetail);
