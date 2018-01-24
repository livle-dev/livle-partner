import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchConcerts } from '../../actions';
import { withRouter } from 'react-router-dom';
// view
import ConcertTable from './ConcertTable';

class ConcertManage extends Component {
  state = { fetchedDue: false, fetchedEnd: false };

  componentWillMount() {
    const { fetchConcerts } = this.props;
    fetchConcerts('due')
      .then(() => this.setState({ fetchedDue: true }))
      .catch(res => alert(res.data));
    fetchConcerts('end')
      .then(() => this.setState({ fetchedEnd: true }))
      .catch(res => alert(res.data));
  }

  render() {
    const { concertList } = this.props;

    return (
      <div>
        <ConcertTable
          title="예정공연"
          backgroundColor="rgba(0, 0, 0, 0.58)"
          concerts={concertList.due}
          fetched={this.state.fetchedDue}
        />
        <ConcertTable
          title="끝난공연"
          backgroundColor="rgba(20, 42, 41, 0.58)"
          concerts={concertList.end}
          fetched={this.state.fetchedEnd}
        />
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
