import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { approvePartner } from '../../actions'
import PropTypes from 'prop-types'

const PartnerTable = ({ partners, approvePartner }) => {
  const ApproveButton = ({ id }) =>
    (<button onClick={(e) => approvePartner(id)
        .then(() => alert("성공"))
        .catch((msg) => alert(msg))
    }>승인</button>)

  const partnerRows = map(partners,
    p => (<tr key={p.id}>
      <td>{p.username}</td>
      <td>{p.company}</td>
      <td>{p.approved ? "O" : <ApproveButton id={p.id} />}</td>
    </tr>)
  )

  return (<table>
    <thead>
      <tr>
        <th>아이디</th>
        <th>회사명</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      { partnerRows }
    </tbody>
  </table>)
}

PartnerTable.propTypes = {
  // prop 'partners' should be an array of partner objects
  partners: PropTypes.arrayOf(PropTypes.object)
}

export default connect(null, { approvePartner })(PartnerTable)
