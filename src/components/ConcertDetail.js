import React, { Component } from 'react';
import { connect } from 'react-redux'
import { find } from 'lodash'
import { fetchConcertDetail } from '../actions'

class ConcertDetail extends Component {
  constructor({ concertList, match, fetchConcertDetail }) {
    super()
    const concertId = match.params.id
    const concert = find(concertList, c => c.id == concertId)
    this.state = { concert: concert || { id: concertId } }
    // TODO
    // fetchConcertDetail(id)....
  }

  render() {
    const concert = this.state.concert
    return (<div>
      콘서트 아이디: { concert.id }
      제목 : { concert.title }
      이미지
      <img src={concert.image} />
      show other data...
    </div>)
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList }
}

export default connect(mapStateToProps, { fetchConcertDetail })(ConcertDetail)
