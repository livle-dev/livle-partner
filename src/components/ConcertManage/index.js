import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchConcerts } from '../../actions';
import { withRouter } from 'react-router-dom';
// view
import Loading from '../Loading';
import ConcertTable from './ConcertTable';

class ConcertManage extends Component {
  state = { fetched: false };

  componentWillMount() {
    const { fetchConcerts } = this.props;
    fetchConcerts()
      .then(() => this.setState({ fetched: true }))
      .catch(msg => alert(msg));
  }

  render() {
    if (!this.state.fetched) return <Loading fullscreen />;
    const { total_pages, current_page, data } = this.props.concertList;
    if (data.length == 0) return '등록된 공연이 없습니다.';

    const now = moment();
    let upcomingConcerts = [];
    let endConcerts = [];
    data.forEach(item => {
      if (moment(item.start_at).diff(now) > 0) upcomingConcerts.push(item);
      else endConcerts.push(item);
    });

    return (
      <div>
        <ConcertTable
          title="예정공연"
          backgroundColor="rgba(0, 0, 0, 0.58)"
          concerts={upcomingConcerts}
        />
        <p className="_white">TODO: PAGINATION</p>
        <ConcertTable
          title="끝난공연"
          backgroundColor="rgba(20, 42, 41, 0.58)"
          concerts={endConcerts}
        />
        <p className="_white">TODO: PAGINATION</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList };
}

export default withRouter(
  connect(mapStateToProps, { fetchConcerts })(ConcertManage)
);
