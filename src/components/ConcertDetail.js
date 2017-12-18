import React, { Component } from 'react';
import { connect } from 'react-redux'
import { find } from 'lodash'
import { fetchConcertDetail } from '../actions'
import Chart from './Chart';

import axios from '../actions/axios';



class ConcertDetail extends Component {
  constructor({ concertList, match }) {
    super();
    const concertId = match.params.id
    const concert = find(concertList, c => c.id == concertId) // object가 들어와있음
    // concert: object, id: string
    this.state = { concert: concert || { id: concertId }, stats: {} }
    this.fetchConcertStats = this.fetchConcertStats.bind(this);
    // TODO
    // fetchConcertDetail(id)....
  }

  componentWillMount() {
    this.fetchConcertStats()
  }

  fetchConcertStats(){
    axios.get(`/ticket/${this.state.concert.id}/stats`)
      .then((res)=>{
        console.log(res.data);
        this.setState({stats: res.data});
      })
      .catch((err)=>
        console.log(err))
  }

  render() {
    const concert = this.state.concert
    return (concert ? <div>
      <div>입장 비밀번호: { concert.checkin_code }</div>
      <div>
        <div>예약 현황</div>
        <div>
          <Chart start_at={this.state.stats.start_at} reservations={this.state.stats.reservations}/>
        </div>
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
