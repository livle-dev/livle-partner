import React, { Component } from 'react'
import { createSubscription } from '../actions/index'
import { connect } from 'react-redux'
import { Form, Text } from 'react-form'

class Payment extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    this.props.createSubscription(values)
      .then((res) => { console.log(res); alert('성공!') })
      .catch(err => { console.error(err); alert('실패 ㅡㅡ')} )
  }

  render() {
    return (<Form onSubmit={submittedValues => this.handleSubmit(submittedValues)}>
      { formApi => (<form onSubmit={formApi.submitForm}>
        <Text field="cardNumber" placeholder="카드번호" />
        <Text field="expiry" placeholder="유효기간(yyyy-mm)" />
        <Text field="birth" placeholder="주민번호 앞 6자리" />
        <Text field="password" placeholder="비밀번호 앞 2자리" />
        <button type='submit'>결제</button>
      </form>) }
    </Form>)
  }

}

export default connect(null, { createSubscription })(Payment)
