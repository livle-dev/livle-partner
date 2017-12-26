import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { fetchConcerts } from '../../actions';
import TicketForm from './TicketForm';
import Content from '../Content';

class ConcertAdd extends Component {
  state = { fetched: false };

  constructor({ fetchConcerts }) {
    super();
    this.handleClick = this.handleClick.bind(this);
    fetchConcerts()
      .then(() => this.setState({ fetched: true }))
      .catch(msg => alert(msg));

    this.state = { selectedConcert: '' };
  }

  handleClick(selectedConcert) {
    this.setState({ selectedConcert });
  }

  render() {
    const concertList =
      this.props.concertList.length == 0
        ? '등록된 공연이 없습니다.'
        : map(this.props.concertList, c => {
            return (
              <div className="_table-row _body" key={c.id}>
                <div className="_flex_1">
                  <div className="main-image text-cetner">TODO</div>
                  <div className="main-title text-cetner">{c.title}</div>
                  <div className="line-up text-cetner">TODO</div>
                  <div className="place text-cetner">TODO</div>
                </div>
                <div className="number text-cetner">TODO</div>
                <div className="number">TODO</div>
                <div
                  className="button _green-aqua"
                  onClick={e => {
                    e.preventDefault();
                    this.handleClick(c);
                  }}>
                  수정하기
                </div>
              </div>
            );
          });

    return (
      <div>
        <Content title="공연 등록" backgroundColor="rgba(0, 0, 0, 0.58)">
          <TicketForm
            selected={this.state.selectedConcert}
            key={this.state.selectedConcert.id || '00000'}
          />
        </Content>
        <Content title="공연 목록" backgroundColor="rgba(20, 42, 41, 0.58)">
          <div className="_flex_1 _column-direction">
            <div className="_table-row _title">
              <div className="_flex_1">
                <div className="main-image text-cetner">메인 이미지</div>
                <div className="main-title text-cetner">공연명</div>
                <div className="line-up text-cetner">라인업</div>
                <div className="place text-cetner">장소</div>
              </div>
              <div className="number text-cetner">시간</div>
              <div className="number">영상 링크</div>
              <div className="button" />
            </div>
            {this.state.fetched ? concertList : 'Loading...'}
          </div>
        </Content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { concertList: state.concertList };
}

export default connect(mapStateToProps, { fetchConcerts })(ConcertAdd);
