// Libraried
import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// Views
import Content from '../Content';

const ConcertTable = ({ title, backgroundColor, concerts, history }) => {
  const concertRows = map(concerts, c => (
    <div
      className="_table-row _clickable-body"
      key={c.id}
      onClick={e => history.push(`/concert/${c.id}`)}>
      <div className="_flex_1">
        <div className="partner-id">{c.partner_id}</div>
        <div className="title">{c.title}</div>
      </div>
      <div className="number text-cetner">{c.checkin_code}</div>
      <div className="number">TODO</div>
    </div>
  ));

  return (
    <Content title={title} backgroundColor={backgroundColor}>
      <div className="_flex_1 _column-direction">
        <div className="_table-row _title">
          <div className="_flex_1">
            <div className="partner-id text-cetner">파트너명</div>
            <div className="title text-cetner">공연명</div>
          </div>

          <div className="number text-cetner">입장비밀번호</div>
          <div className="number">예약자수</div>
        </div>
        {concertRows}
      </div>
    </Content>
  );
};

ConcertTable.propTypes = {
  // prop 'tickets' should be an array of ticket objects
  concerts: PropTypes.arrayOf(PropTypes.object),
};

export default withRouter(ConcertTable);
