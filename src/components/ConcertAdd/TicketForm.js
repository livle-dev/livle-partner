import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, NestedForm, Text } from 'react-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactS3Uploader from 'react-s3-uploader';
import { createTicket, getSignedUrl, patchTicket } from '../../actions';
import _ from 'lodash';

import 'react-datepicker/dist/react-datepicker.css';

const Input = ({ title, children }) => {
  return (
    <div className="input-container _row-direction _vcenter-position">
      <p className="input-placeholder _white _fs_22">{title}</p>
      {children}
    </div>
  );
};

class TicketForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { startDate: moment(), endDate: moment() };
  }
  componentWillMount() {
    this.setState({
      startDate: moment(this.props.selected.start_at),
      endDate: moment(this.props.selected.end_at),
    });
  }

  handleSubmit(values, e, formApi) {
    !this.props.selected ? (
    this.props
      .createTicket(values)
      .then(() => {
        alert('공연을 추가했습니다.');
        formApi.resetAll();
      })
      .catch(err => {
        console.log(err);
      }) )
        : (
          this.props
              .patchTicket(values, this.props.selected.id, this.props.selected.partner_id)
              .then(()=>{
                  console.log(this.state);
                  alert('공연이 수정되었습니다.');
              })
              .catch(err=>console.log(err))
        )
  }

  render() {
    const Artist = ({ i, handleRemove, artist }) => {
      return (
        <NestedForm field={['artists', i]} key={`artist-${i}`}>
          <Form defaultValues={artist}>
            {formApi => (
              <div className="add-artist-container">
                <div
                  className="button _red _flex _hright-position"
                  onClick={e => {
                    e.preventDefault();
                    handleRemove(e);
                  }}>
                  취소하기
                </div>
                <div>
                  <Text field="name" placeholder="아티스트 이름" />
                </div>
                <div>
                  {formApi.values.image && <img src={formApi.values.image} />}
                  <ReactS3Uploader
                    accept="image/*"
                    getSignedUrl={this.props.getSignedUrl}
                    onFinish={sign => formApi.setValue('image', sign.filePath)}
                  />
                </div>
              </div>
            )}
          </Form>
        </NestedForm>
      );
    };

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
                <Input title="대표이미지">
                  {formApi.values.image && <img src={formApi.values.image} />}
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
                  {!!this.state.uploadProgress &&
                    `${this.state.uploadProgress}% 완료`}
                </Input>
                <Input title="공연일정">
                  <DatePicker
                    selected={this.state.startDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="LLL"
                    onChange={date => {
                      this.setState({ startDate: date });
                      formApi.setValue('start_at', date);
                    }}
                  />
                  <div className="_flex_1 _vcenter-position _hcenter-position">
                    <p className="_white _fs_2">~</p>
                  </div>
                  <DatePicker
                    selected={this.state.endDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="LLL"
                    onChange={date => {
                      this.setState({ endDate: date });
                      formApi.setValue('end_at', date);
                    }}
                  />
                </Input>
              </div>
              <div className="right-container">
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
                <Input title="라인업">
                  {formApi.values.artists &&
                    _.map(formApi.values.artists, (a, index) => (
                      <Artist
                        key={index}
                        artist={a}
                        i={index}
                        handleRemove={() =>
                          formApi.removeValue('artists', index)
                        }
                      />
                    ))}
                  <div
                    className="button _green-aqua"
                    onClick={e => {
                      e.preventDefault();
                      formApi.addValue('artists', {});
                    }}>
                    추가
                  </div>
                </Input>
                <Input title="영상정보">
                  <Text field="video_id" placeholder="Youtube ID" />
                </Input>
              </div>
            </div>
            <div className="_flex _hright-position">
              <button type="submit" className="submit-button">
                {this.props.selected === '' ? '공연 등록하기' : '수정하기'}
              </button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}

export default connect(null, { createTicket, patchTicket, getSignedUrl })(TicketForm);
