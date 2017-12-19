import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConcerts } from '../../actions';
import { filter } from 'lodash';
import { withRouter } from 'react-router-dom';
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
    if (!this.state.fetched) return 'Loading...';

    const concerts = this.props.concertList;
    if (concerts.length == 0) return '등록된 공연이 없습니다.';

    const now = new Date();
    const upcomings = filter(concerts, c => Date.parse(c.start_at) > now);
    const ended = filter(concerts, c => Date.parse(c.start_at) <= now);

    return (
      <div>
        <h2>예정 공연</h2>
        <ConcertTable concerts={upcomings} />
        <h2>끝난 공연</h2>
        <ConcertTable concerts={ended} />
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
