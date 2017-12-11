import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchConcerts } from '../../actions'
import { map } from 'lodash'
import { withRouter } from 'react-router-dom';
import ConcertTable from './ConcertTable'

class ConcertManage extends Component {
  state = { fetched: false }

  componentWillMount() {
    const { fetchConcerts } = this.props
    fetchConcerts()
      .then(() => this.setState({ fetched: true }))
      .catch((msg) => alert(msg))
  }

  render() {
    if (!this.state.fetched) {
      return 'Loading...'
    }

    const concerts = this.props.concertList
    return (<div>
      {
        concerts.length == 0 ?  "등록된 공연이 없습니다." : <ConcertTable concerts={concerts} />
      }
    </div>)
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList }
}

export default withRouter(connect(mapStateToProps, { fetchConcerts })(ConcertManage))
