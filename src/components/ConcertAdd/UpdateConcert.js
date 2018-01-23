// library
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, NestedForm, Text, Select } from 'react-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactS3Uploader from 'react-s3-uploader';
import { map } from 'lodash';
// actions
import {
  fetchPartners,
  createTicket,
  getSignedUrl,
  patchTicket,
} from '../../actions';

import 'react-datepicker/dist/react-datepicker.css';

const Input = ({ title, children, ...option }) => (
  <div className="input-container _row-direction _vcenter-position" {...option}>
    <p className="input-placeholder _white _fs_22">{title}</p>
    <div className="input-children _flex_1">{children}</div>
  </div>
);

const InputDate = ({ text, selected, onChange }) => (
  <div className="_flex_1 _hcenter-position">
    <div
      className="_flex _vcenter-position"
      style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
      <p className="_white _fw-semi-bold _fs-18 _whitespace-nowrap">{text} :</p>
    </div>
    <DatePicker
      selected={selected}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="YYYY.MM.DD HH : mm"
      // callback
      onChange={onChange}
    />
  </div>
);

const InputArtist = ({ index, artist, handleRemove, getSignedUrl }) => {
  return (
    <NestedForm field={['artists', index]} key={`artist-${index}`}>
      <Form defaultValues={artist}>
        {formApi => (
          <div className="add-artist-container _flex _column-direction">
            <div
              className="remove-button _red"
              onClick={e => {
                e.preventDefault();
                handleRemove(e);
              }}>
              삭제
            </div>
            <div id="input-artist-image">
              {formApi.values.image && <img src={formApi.values.image} />}
              <ReactS3Uploader
                accept="image/*"
                getSignedUrl={getSignedUrl}
                onFinish={sign => formApi.setValue('image', sign.filePath)}
              />
            </div>
            <div>
              <Text field="name" placeholder="아티스트 이름" />
            </div>
          </div>
        )}
      </Form>
    </NestedForm>
  );
};

class UpdateConcert extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { startDate: moment(), endDate: moment() };
  }

  componentWillMount() {
    if (!this.props.partnerList.length) this.props.fetchPartners();
    this.setState({
      startDate: moment(this.props.selected.start_at),
      endDate: moment(this.props.selected.end_at),
    });
  }

  handleSubmit(values, e, formApi) {
    if (this.state.submitting) return alert('작업 중입니다.');
    this.setState({ submitting: true });

    !this.props.selected
      ? this.props
          .createTicket(values)
          .then(() => {
            alert('공연을 추가했습니다.');
            this.setState({ submitting: false });
            formApi.resetAll();
          })
          .catch(err => {
            this.setState({ submitting: false });
          })
      : this.props
          .patchTicket(
            values,
            this.props.selected.id,
            this.props.selected.partner_id
          )
          .then(() => {
            alert('공연이 수정되었습니다.');
            this.setState({ submitting: false });
          })
          .catch(err => {
            this.setState({ submitting: false });
          });
  }

  render() {
    const partnerOptions = map(this.props.partnerList.data, p => {
      return { label: p.company, value: p.id };
    });

    // TODO validation
    return (
      <Form
        onSubmit={this.handleSubmit}
        defaultValues={{
          title: this.props.selected.title || '',
          place: this.props.selected.place || '',
          image: this.props.selected.image || '',
          video_id: this.props.selected.video_id || '',
          capacity: this.props.selected.capacity || 0,
          // datetime
          start_at: this.props.selected.start_at || moment(),
          end_at: this.props.selected.end_at || moment(),
          artists: this.props.selected.artists || [],
        }}>
        {formApi => (
          <form onSubmit={formApi.submitForm} id="ticket-form">
            <div className="_row-direction">
              <div className="left-container">
                <Input title="공연이름">
                  <Text field="title" placeholder="공연이름" />
                </Input>
                <Input title="공연장소">
                  <Text field="place" placeholder="공연장소" />
                </Input>
                <Input title="대표이미지" id="input-image">
                  <div className="_flex _column-direction">
                    {formApi.values.image && (
                      <img src={formApi.values.image} className="main-image" />
                    )}
                    {this.state.uploadProgress && (
                      <p className="_white _fs-18 _fw-light">
                        {this.state.uploadProgress}%
                      </p>
                    )}
                    <ReactS3Uploader
                      accept="image/*"
                      getSignedUrl={this.props.getSignedUrl}
                      onProgress={percent =>
                        this.setState({ uploadProgress: percent })
                      }
                      onFinish={sign => {
                        this.setState({ uploadProgress: null });
                        formApi.setValue('image', sign.filePath);
                      }}
                    />
                  </div>
                </Input>
                <Input title="공연일정" id="input-date">
                  <InputDate
                    text="시작"
                    selected={this.state.startDate}
                    onChange={date => {
                      this.setState({ startDate: date });
                      formApi.setValue('start_at', date);
                    }}
                  />
                  <InputDate
                    text="종료"
                    selected={this.state.endDate}
                    onChange={date => {
                      this.setState({ endDate: date });
                      formApi.setValue('end_at', date);
                    }}
                  />
                </Input>
              </div>
              <div className="right-container">
                <Input title="파트너사">
                  <Select field="partner_id" options={partnerOptions} />
                </Input>
                <Input title="확보 좌석">
                  <input
                    type="number"
                    name="capacity"
                    className="_flex_1"
                    value={formApi.values.capacity}
                    onChange={e =>
                      formApi.setValue(e.target.name, e.target.value)
                    }
                  />
                </Input>
                <Input title="라인업" id="artist">
                  {formApi.values.artists &&
                    map(formApi.values.artists, (a, index) => (
                      <InputArtist
                        key={index}
                        artist={a}
                        index={index}
                        getSignedUrl={this.props.getSignedUrl}
                        handleRemove={() =>
                          formApi.removeValue('artists', index)
                        }
                      />
                    ))}
                  <div className="_flex _vcenter-position _hcenter-position">
                    <div
                      className="add-artist-button _flex _vcenter-position _hcenter-position"
                      onClick={e => {
                        e.preventDefault();
                        formApi.addValue('artists', {});
                      }}>
                      + 추가
                    </div>
                  </div>
                </Input>
                <Input title="영상정보">
                  <Text field="video_id" placeholder="Youtube ID" />
                </Input>
              </div>
            </div>
            <div className="_flex _hright-position">
              <button
                type="submit"
                className="submit-button _fs_22"
                style={this.state.submitting ? { background: 'black' } : {}}>
                {this.props.selected.length === 0
                  ? '공연 등록하기'
                  : '수정하기'}
              </button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return { partnerList: state.partnerList };
}

export default connect(mapStateToProps, {
  createTicket,
  patchTicket,
  getSignedUrl,
  fetchPartners,
})(UpdateConcert);
