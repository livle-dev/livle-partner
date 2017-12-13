import React, { Component } from 'react';
import { connect } from 'react-redux'
import { find } from 'lodash'
import { fetchConcertDetail } from '../actions'

class ConcertDetail extends Component {
  state = { }
  componentWillMount() {
    const { concertList, match, fetchConcertDetail } = this.props
    const concertId = match.params.id
    const concert = find(concertList, c => c.id == concertId)
    this.setState({ concert: concert })
    if (!concert) {
      // TODO load concerts
    }
  }

  render() {
    const concert = this.state.concert
    return (concert ? <div>
      <div>입장 비밀번호: { concert.checkin_code }</div>
      <div>
        <div>예약 현황</div>
        <div>chart</div>
      </div>
      <div>
        <div>예약자</div>
        <div>
          예약자 테이블
        </div>
        <div>
          예약자 수
        </div>
      </div>
      {
        //콘서트 아이디: { concert.id }
        //제목 : { concert.title }
        // 이미지
        // <img src={concert.image} />
        // show other data...
      }
    </div> : 'TODO 데이터 가져오기')
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList }
}

export default connect(mapStateToProps, { fetchConcertDetail })(ConcertDetail)
