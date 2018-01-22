import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchConcerts } from '../../actions';
// view
import UpdateConcert from './UpdateConcert';
import ConcertList from './ConcertList';
import Content from '../Content';
import Loading from '../Loading';

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
    return (
      <div>
        <Content title="공연 등록" backgroundColor="rgba(0, 0, 0, 0.58)">
          <UpdateConcert
            selected={this.state.selectedConcert}
            key={this.state.selectedConcert.id || '00000'}
          />
        </Content>
        <Content title="공연 목록" backgroundColor="rgba(20, 42, 41, 0.58)">
          <div className="_flex_1 _column-direction">
            <div className="_table-row _title">
              <div className="_flex_1 _vcenter-position">
                <div className="main-title _text-center">공연명</div>
                <div className="line-up _text-center">라인업</div>
                <div className="place _text-center">장소</div>
              </div>
              <div className="number">시작 시각</div>
              <div className="number">영상 링크</div>
              <div className="button" />
            </div>
            {this.state.fetched ? (
              <ConcertList
                concertList={this.props.concertList}
                handleClick={this.handleClick}
              />
            ) : (
              <Loading />
            )}
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
