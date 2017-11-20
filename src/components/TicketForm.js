import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text } from 'react-form'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { createTicket, checkSession } from '../actions'

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
      .catch(() => alert("FAILURE"))
  }

  render() {

    // TODO validation
    return (<Form onSubmit={submittedValues => this.handleSubmit(submittedValues)}
      defaultValues={ { start_at: moment(), end_at: moment() } }>
      { formApi => (<form onSubmit={formApi.submitForm}>
        <Text field="title" placeholder="공연이름" />
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
        // TODO : S3 이미지 업로드
        <Text field="image" placeholder="이미지 경로" />
        <Text field="capacity" placeholder="확보 티켓 수" />
        <Text field="place" placeholder="공연 장소" />
        <Text field="music_id" placeholder="음악 아이디 (선택)" />
        <Text field="video_id" placeholder="비디오 아이디 (선택)" />
        <Text field="article" placeholder="웹뷰 주소 (선택)" />
        <button type="submit">추가하기</button>
      </form>)
      }
    </Form>)
  }
}

export default connect(null, { createTicket, checkSession })(TicketForm)
