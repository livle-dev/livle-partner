import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { fetchConcerts } from '../../actions';
// view
import UpdateConcert from './UpdateConcert';
import Content from '../Content';
import Loading from '../Loading';
import HoverableDiv from './HoverableDiv'

const formatDate = time => moment(time).format('MM/DD HH : mm');

const artistsToString = artists => {
  const maxLength = 36;
  let artistString = '';
  artists.forEach((item, index) => {
    artistString = artistString + item.name;
    if (artists[index + 1]) artistString = artistString + ', ';
  });

  return artistString;
  if (artistString.length > maxLength) {
    return artistString.substring(0, maxLength) + '...';
  } else {
    return artistString;
  }
};

const ConcertList = ({ concertList, handleClick }) => {
  let filterList = concertList.filter(
    item => moment(item.end_at).diff(moment()) > 0
  );
  if (filterList.length === 0) return <p>등록된 공연이 없습니다.</p>;
  filterList.sort((x, y) => moment(x.start_at).diff(moment(y.start_at)));

  return (
    <div>
      {map(filterList, c => {
        const image = (<img src={c.image} style={
          { width: '100%', maxWidth: '200px', maxHeight: '400px' }
        } />)
        const artists = (<div>
          { map(c.artists, (c) => (<div key={c.id} style={ { display: 'inline-block' } }>
            <div>
              <img src={c.image} style={ { width: '100%', maxWidth: '100px' } }/>
            </div>
            <div>
              { c.name }
            </div>
          </div>)
          )}
        </div>)
        return (
          <div className="_table-row _body" key={c.id}>
            <div className="_flex_1 _vcenter-position">
              <HoverableDiv className="main-title" hover={image}>
                {c.title}
              </HoverableDiv>
              <HoverableDiv className="line-up" hover={artists}>
                {artistsToString(c.artists)}
              </HoverableDiv>
              <div className="place">{c.place}</div>
            </div>
            <div className="number">{formatDate(c.start_at)}</div>
            <div className="number">{c.video_id}</div>
            <div
              className="button _green-aqua"
              onClick={e => {
                e.preventDefault();
                handleClick(c);
              }}>
              수정하기
            </div>
          </div>
        );
      })}
    </div>
  );
};

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
              <div className="number">시간</div>
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
