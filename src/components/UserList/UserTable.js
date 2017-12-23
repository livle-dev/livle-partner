import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import PropTypes from 'prop-types';
// Views
import Content from '../Content';

const UserTable = ({ users }) => {
  const userRows = map(users, u => (
    <tr key={u.id}>
      <td>{u.email}</td>
      <td>{u.nickname || '없음'}</td>
      <td>TODO</td>
      <td>TODO</td>
      <td>TODO</td>
    </tr>
  ));

  return (
    <Content title="회원 목록" backgroundColor="rgba(0, 0, 0, 0.58)">
      <table>
        <thead>
          <tr>
            <th>회원 이메일</th>
            <th>회원 닉네임</th>
            <th>~</th>
            <th>~</th>
            <th>~</th>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </table>
    </Content>
  );
};

UserTable.propTypes = {
  // prop 'users' should be an array of user objects
  users: PropTypes.arrayOf(PropTypes.object),
};

export default UserTable;
