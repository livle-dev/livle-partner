import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchConcerts } from '../actions'
import { map } from 'lodash'

class ConcertList extends Component {
  state = { fetched: false }

  constructor({ fetchConcerts }) {
    super()
    fetchConcerts()
      .then(() => this.setState({ fetched: true }))
      .catch((msg) => alert(msg))
  }

  render() {
    const concertList = this.props.concertList.length == 0 ? "등록된 공연이 없습니다." :
      map(this.props.concertList, c => <div key={c.id}>{c.title}</div>)

    return (<div>
      { this.state.fetched ? concertList : 'Loading...' }
    </div>)
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList }
}

export default connect(mapStateToProps, { fetchConcerts })(ConcertList)
