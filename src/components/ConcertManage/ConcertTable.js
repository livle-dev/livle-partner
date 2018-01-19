// Libraried
import React from 'react';
import { connect } from 'react-redux';
import { map, find } from 'lodash';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// Views
import Content from '../Content';

const ConcertTable = ({
  title,
  backgroundColor,
  concerts,
  history,
  user,
  partnerList,
}) => {
  const companyFromId = id => {
    const partner = find(partnerList, p => p.id === id);
    return partner ? partner.company : `Partner ${id}`;
  };

  const concertRows = map(concerts, c => (
    <div
      className="_table-row _clickable-body"
      key={c.id}
      onClick={e => history.push(`/concert/${c.id}`)}>
      <div className="_flex_1">
        {user.isAdmin && (
          <div className="partner-id">{companyFromId(c.partner_id)}</div>
        )}
        <div className="title">{c.title}</div>
      </div>
      <div className="number _text-center">{c.checkin_code}</div>
      <div className="number">{c.reserved}</div>
    </div>
  ));

  return (
    <Content title={title} backgroundColor={backgroundColor}>
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="_flex_1">
            {user.isAdmin && (
              <div className="partner-id _text-center">파트너사</div>
            )}
            <div className="title _text-center">공연명</div>
          </div>
          <div className="number _text-center">입장번호</div>
          <div className="number">예약자수</div>
        </div>
        {concertRows}
      </div>
    </Content>
  );
};

ConcertTable.propTypes = {
  concerts: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  return { partnerList: state.partnerList, user: state.auth };
}

export default withRouter(connect(mapStateToProps, {})(ConcertTable));
