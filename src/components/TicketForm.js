import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text } from 'react-form'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ReactS3Uploader from 'react-s3-uploader'
import { createTicket, getSignedUrl } from '../actions'

import 'react-datepicker/dist/react-datepicker.css'

class TicketForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { startDate: moment(), endDate: moment() }
  }

  handleSubmit(values) {
    this.props.createTicket(values)
      .then(() => alert("SUCCESS"))
      .catch(err => { console.log(err); alert("FAILURE")})
  }

  render() {

    // TODO validation
    return (<Form onSubmit={submittedValues => this.handleSubmit(submittedValues)}
      defaultValues={ { start_at: moment(), end_at: moment(), capacity: 0 } }>
      { formApi => (<form onSubmit={formApi.submitForm}>
        <div>
          <h3>기본 정보</h3>
          <div>
            <Text field="title" placeholder="공연이름" />
          </div>
          <div>
            <Text field="place" placeholder="공연장소" />
          </div>
          <div>
            대표이미지
            { formApi.values.image && <img src={formApi.values.image} /> }
            <ReactS3Uploader accept="image/*" getSignedUrl={this.props.getSignedUrl}
              onProgress={ percent => this.setState({ uploadProgress: percent }) }
              onFinish={ sign => { this.setState({ uploadProgress: null }); formApi.setValue('image', sign.filePath) } } />
            { !!this.state.uploadProgress && `${this.state.uploadProgress}% 완료` }
          </div>
        </div>
        <div>
          <h3>공연일정</h3>
          <DatePicker selected={this.state.startDate}
            showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="LLL"
            onChange={date =>
              {
                this.setState({ startDate: date })
                formApi.setValue("start_at", date)
              }
            } />
          <DatePicker selected={this.state.endDate}
            showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="LLL"
            onChange={date => {
              this.setState({ endDate: date })
              formApi.setValue("end_at", date)
            } } />
        </div>
        <div>
          <h3>확보 좌석 수</h3>
          <input type="number" name="capacity" value={formApi.values.capacity}
            onChange={e => formApi.setValue(e.target.name, e.target.value)} />
        </div>
        <div>
          <h3>선택입력</h3>
          <Text field="music_id" placeholder="음악 아이디 (선택)" />
          <Text field="video_id" placeholder="비디오 아이디 (선택)" />
          <Text field="article" placeholder="웹뷰 주소 (선택)" />
        </div>
        <button type="submit">추가하기</button>
      </form>)
      }
    </Form>)
  }
}

export default connect(null, { createTicket, getSignedUrl })(TicketForm)
