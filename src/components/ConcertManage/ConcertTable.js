import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

const ConcertTable = ({ concerts, history }) => {

  const concertRows = map(concerts,
    c => (<tr key={c.id} onClick={ e => history.push(`/concert/${c.id}`) }>
      <td>{c.partner_id}</td>
      <td>{c.title}</td>
      <td>{c.checkin_code}</td>
      <td>TODO</td>
    </tr>)
  )

  return (<table>
    <thead>
      <tr>
        <th>파트너명</th>
        <th>공연명</th>
        <th>입장비밀번호</th>
        <th>예약자수</th>
      </tr>
    </thead>
    <tbody>
      { concertRows }
    </tbody>
  </table>)
}

ConcertTable.propTypes = {
  // prop 'tickets' should be an array of ticket objects
  concerts: PropTypes.arrayOf(PropTypes.object)
}

export default withRouter(ConcertTable)
