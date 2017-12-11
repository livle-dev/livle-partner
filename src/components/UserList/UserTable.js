import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import PropTypes from 'prop-types'

const UserTable = ({ users }) => {

  const userRows = map(users,
    u => (<tr key={u.id}>
      <td>{u.email}</td>
      <td>{u.nickname || "없음"}</td>
      <td>TODO</td>
      <td>TODO</td>
      <td>TODO</td>
    </tr>)
  )

  return (<table>
    <thead>
      <tr>
        <th>회원 이메일</th>
        <th>회원 닉네임</th>
        <th>~</th>
        <th>~</th>
        <th>~</th>
      </tr>
    </thead>
    <tbody>
      { userRows }
    </tbody>
  </table>)
}

UserTable.propTypes = {
  // prop 'partners' should be an array of partner objects
  users: PropTypes.arrayOf(PropTypes.object)
}

export default UserTable
