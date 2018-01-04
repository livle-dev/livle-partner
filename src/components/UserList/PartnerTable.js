import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { approvePartner } from '../../actions';
import PropTypes from 'prop-types';
// Views
import Content from '../Content';

const PartnerTable = ({ partners, approvePartner }) => {
  const partnerRows = map(partners, p => (
    <div className="_table-row _body" key={p.id}>
      <div className="user-id">{p.username}</div>
      <div className="_flex_1">{p.company}</div>
      {!p.approved && (
        <div
          className="button text-cetner _green-aqua"
          onClick={e =>
            approvePartner(p.id)
              .then(() => alert('승인되었습니다'))
              .catch(err => alert(err.response.data))
          }>
          승인
        </div>
      )}
    </div>
  ));

  return (
    <Content title="파트너 목록" backgroundColor="rgba(0, 0, 0, 0.58)">
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="user-id text-cetner">아이디</div>
          <div className="_flex_1">회사명</div>
          <div className="button" />
        </div>
        {partnerRows}
      </div>
    </Content>
  );
};

PartnerTable.propTypes = {
  // prop 'partners' should be an array of partner objects
  partners: PropTypes.arrayOf(PropTypes.object),
};

export default connect(null, { approvePartner })(PartnerTable);
