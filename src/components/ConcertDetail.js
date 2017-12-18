import React, { Component } from 'react';
import { connect } from 'react-redux'
import { find } from 'lodash'
import { fetchConcertDetail } from '../actions'
import Chart from './Chart';

import axios from '../actions/axios';



class ConcertDetail extends Component {
  constructor({ concertList, match, fetchConcertDetail }) {
    super();
    const concertId = match.params.id;
    const concert = find(concertList, c => c.id == concertId); //object가 들어와있음
    this.state = { concert: concert || {id: concertId }, stats: {} }; //concert: object, id: string?
    this.fetchConcertStats=this.fetchConcertStats.bind(this);
    // TODO
    // fetchConcertDetail(id)....
    this.fetchConcertStats();
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
    const concert = this.state.concert;
    return (
        <div>
          <div>
              콘서트 아이디: { concert.id }
              제목 : { concert.title }
              이미지
              <img src={concert.image} />
              show other data...
          </div>
          <Chart start_at={this.state.stats.start_at} reservations={this.state.stats.reservations}/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList }
}

export default connect(mapStateToProps, { fetchConcertDetail })(ConcertDetail)
