import React from 'react';
import { connect } from 'react-redux';
import { map, find, reduceRight } from 'lodash';
import PropTypes from 'prop-types';
// Views
import Content from '../Content';

const UserTable = ({ users }) => {
  const startOfSubscription = (user) => {
    const formatter = (dateString) => {
      const date = new Date(dateString)
      return `${date.getMonth() + 1} / ${date.getDate()}`
    }
    const start = reduceRight(user.subscriptions, (result, curr) => {
      if (!result) return curr
      if (curr.next_subscription_id === result.id) return curr
      return result
    })
    if (start) {
      return formatter(start.from)
    } else {
      return '-'
    }
  }

  const subscriptionStatus = (user) => {
    const subs = user.subscriptions
    if (subs.length === 0) return '-' // 구독한 적 없음
    const unpaidSub = find(subs, (s) => !s.paid_at)
    if (!unpaidSub) return 'X' // 구독한 적 있으나 중단함
    if (new Date(unpaidSub.from) < new Date()) {
      return '미납'
    } else {
      return 'O' // 정상 구독
    }
  }

  const userRows = map(users, u => (
    <div className="_table-row _body" key={u.id}>
      <div className="_flex_1">
        <div className="email text-cetner">{u.email}</div>
        <div className="nickname text-cetner">{u.nickname || '없음'}</div>
      </div>
      <div className="date _text-center">{startOfSubscription(u)}</div>
      <div className="short-text _text-center">{subscriptionStatus(u)}</div>
      <div className="number _text-center">TODO</div>
    </div>
  ));

  return (
    <Content title="회원 목록" backgroundColor="rgba(20, 42, 41, 0.58)">
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="_flex_1">
            <div className="email text-cetner">이메일</div>
            <div className="nickname text-cetner">닉네임</div>
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
