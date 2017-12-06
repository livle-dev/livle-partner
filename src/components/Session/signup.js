import React, { Component } from 'react';
import { Form, Text } from 'react-form'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../actions';

const SignUp = (props) => {
  const handleSubmit = ({ email, password }) => {
    signupUser({ email, password })
      .then(() => {
        alert('회원가입이 신청되었습니다. 관리자의 승인 후 파트너 페이지를 이용하실 수 있습니다.')
        history.push('/')
      })
  }

  return (<Form onSubmit={ submittedValues => handleSubmit(submittedValues) }>
    { formApi => (<form onSubmit={formApi.submitForm}>
      <Text field="email" placeholder="이메일"/>
      <Text field="password" type="password" placeholder="비밀번호" />
      <Text field="passwordCheck" type="password" placeholder="비밀번호 확인" />
      <Text field='company' placeholder="회사명" />
      <button type="submit" className="btn btn-primary">회원가입</button>
    </form>)
    }
  </Form>)
}

export default withRouter(connect(null, { signupUser })(SignUp))
