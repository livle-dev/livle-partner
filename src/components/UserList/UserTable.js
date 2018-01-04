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
      <div className="date _text-center">TODO</div>
      <div className="short-text _text-center">TODO</div>
      <div className="number _text-center">TODO</div>
    </div>
  ));

  return (
    <Content title="회원 목록" backgroundColor="rgba(20, 42, 41, 0.58)">
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="_flex_1">
            <div className="email text-cetner">파트너명</div>
            <div className="nickname text-cetner">공연명</div>
          </div>
          <div className="date _text-center">구독 시작일자</div>
          <div className="short-text _text-center">구독상태</div>
          <div className="number _text-center">월평균 예약 공연 수</div>
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
