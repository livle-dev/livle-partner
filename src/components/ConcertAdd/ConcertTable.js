import React, { Component } from 'react';
import moment from 'moment';

const formatDate = time => moment(time).format('MM/DD HH : mm');

const artistsToString = artists => {
  const maxLength = 36;
  let artistString = '';
  artists.forEach((item, index) => {
    artistString = artistString + item.name;
    if (artists[index + 1]) artistString = artistString + ', ';
  });

  if (artistString.length > maxLength) {
    return artistString.substring(0, maxLength) + '...';
  } else {
    return artistString;
  }
};

const Artist = ({ artist, index }) => (
  <div className={`artist-container ${index > 0 ? 'artist-margin' : ''}`}>
    <img src={artist.image} className="artist-image" />
    <div className="artist-name _flex _vcenter-position _hcenter-position">
      <p className="_white _fs_20 _fw-normal _text-center">{artist.name}</p>
    </div>
  </div>
);

const ShowDetail = ({ concert, onClick }) => {
  return (
    <div
      className="info-container _flex _vcenter-position _hcenter-position"
      onClick={e => {
        e.preventDefault();
        if (e.target.className === e.currentTarget.className) onClick(e);
      }}>
      <div className="info-box">
        <img src={concert.image} className="info-background" />
        <div className="info-content _flex _column-direction">
          <div className="title _flex _hcenter-position">
            <p className="_white _fs_26 _fw-semi-bold _text-center">
              {concert.title}
            </p>
          </div>
          <img src={concert.image} className="image" />

          <div className="main-container _flex_1 _column-direction">
            <div className="text-container">
              <div className="text-title">
                <p className="_white _fs_20 _fw-normal">공연기간</p>
              </div>
              <div className="_flex_1">
                <p className="_white-clear _fs_20 _fw-normal">
                  {`${formatDate(concert.start_at)}  ~  ${formatDate(
                    concert.end_at
                  )}`}
                </p>
              </div>
            </div>
            <div className="text-container">
              <div className="text-title">
                <p className="_white _fs_20 _fw-normal">장소</p>
              </div>
              <div className="_flex_1">
                <p className="_white-clear _fs_20 _fw-normal">
                  {concert.place}
                </p>
              </div>
            </div>
            <div className="text-container">
              <p className="_white _fs_20 _fw-normal">
                라인업 ({concert.artists.length}팀)
              </p>
            </div>
            <div className="text-container">
              <div className="_flex">
                {concert.artists.map((artist, index) => (
                  <Artist
                    artist={artist}
                    index={index}
                    key={`artist${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="close" onClick={onClick}>
          <p className="_green-light _fs_20 _fw-normal">닫기</p>
        </div>
      </div>
    </div>
  );
};

export default class ConcertTable extends Component {
  state = { clickConcert: null };

  render() {
    const { concertList, handleClick } = this.props;
    const { total_pages, current_page, data } = concertList;
    if (data.length === 0)
      return <p className="_white">등록된 공연이 없습니다.</p>;

    return (
      <div id="concert-info">
        {data.map(c => (
          <div className="_table-row _body" key={c.id}>
            <div className="_flex_1 _vcenter-position">
              <div
                className="main-title _cursor-pointer"
                onClick={() => this.setState({ clickConcert: c })}>
                {c.title}
              </div>
              <div className="line-up">{artistsToString(c.artists)}</div>
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
        ))}
        {this.state.clickConcert && (
          <ShowDetail
            concert={this.state.clickConcert}
            onClick={e => this.setState({ clickConcert: null })}
          />
        )}
      </div>
    );
  }
}
