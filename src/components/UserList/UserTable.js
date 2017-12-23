import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import PropTypes from 'prop-types';
// Views
import Content from '../Content';

const UserTable = ({ users }) => {
  const userRows = map(users, u => (
    <div className="_table-row _body" key={u.id}>
      <div className="_flex_1">
        <div className="email text-cetner">{u.email}</div>
        <div className="nickname text-cetner">{u.nickname || '없음'}</div>
      </div>
      <div className="date">TODO</div>
      <div className="short-text">TODO</div>
      <div className="number">TODO</div>
      <div className="button text-cetner _green-aqua">승인</div>
    </div>
  ));

  return (
    <Content title="회원 목록" backgroundColor="rgba(0, 0, 0, 0.58)">
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="_flex_1">
            <div className="email text-cetner">파트너명</div>
            <div className="nickname text-cetner">공연명</div>
          </div>
          <div className="date">구독 시작일자</div>
          <div className="short-text">구독상태</div>
          <div className="number">월평균 예약 공연 수</div>
          <div className="button" />
        </div>
        {userRows}
      </div>
    </Content>
  );
};

UserTable.propTypes = {
  // prop 'users' should be an array of user objects
  users: PropTypes.arrayOf(PropTypes.object),
};

export default UserTable;
