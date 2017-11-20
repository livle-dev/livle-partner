import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text } from 'react-form'
import { createTicket, checkSession } from '../actions'

class TicketForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    this.props.createTicket(values)
      .then(() => alert("SUCCESS"))
      .catch(() => alert("FAILURE"))
  }

  render() {
    return (<Form onSubmit={submittedValues => this.handleSubmit(submittedValues)}>
      { formApi => (<form onSubmit={formApi.submitForm}>
        <Text field="title" placeholder="공연이름" />
        <Text field="start_at" placeholder="시작시간" />
        <Text field="end_at" placeholder="종료시간" />
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
