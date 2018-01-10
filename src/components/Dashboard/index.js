import React from 'react';
import { connect } from 'react-redux';
import { reduce } from 'lodash';

const Dashboard = ({ userList, concertList }) => {
  return (<div>
    <h1>현황</h1>
    <div style={ { display: 'flex' } }>
      <div>
        <h2>전체 유저 수</h2>
        <div>{Array.isArray(userList) ? `${userList.length}명` : "로드 중"}</div>
      </div>
      <div>
        <h2>전체 공연 수</h2>
        <div>{Array.isArray(concertList) ? `${concertList.length}개` : "로드 중" }</div>
      </div>
      <div>
        <h2>전체 좌석 수</h2>
        <div>{ Math.round(
          reduce(concertList, (count, concert) => count + concert.capacity, 0)
        ) } 석</div>
      </div>
      <div>
        <h2>공연 총 시간</h2>
        <div>{ reduce(concertList, (hours, concert) => {
          const duration = new Date(concert.end_at) - new Date(concert.start_at)
          return hours + ( duration / 1000 / 60 / 60 )
        }, 0) } 시간</div>
      </div>
      <div>
        <h2>공연 참여 횟수</h2>
        <div></div>
      </div>
  </div>

    <h1>기간별 보기</h1>
    <div>데이트 피커</div>
    <div style={ { display: 'flex' } }>
      <div>
        <h2>유입</h2>
        n
      </div>
      <div>
        <h2>가입</h2>
        n
      </div>
      <div>
        <h2>구독</h2>
        n
      </div>
      <div>
        <h2>실결제</h2>
        n
      </div>
      <div>
        <h2>재결제</h2>
        n
      </div>
    </div>
    </div>)
}


function mapStateToProps(state) {
  return { userList: state.userList, concertList: state.concertList, user: state.auth };
}

export default connect(mapStateToProps, { })(Dashboard);
