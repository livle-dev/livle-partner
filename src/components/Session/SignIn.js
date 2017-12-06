import React, { Component } from 'react';
import { Form, Text } from 'react-form'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signinUser } from '../../actions';

const SignIn = ({ history, signinUser }) => {
  const handleSubmit = ({ email, password }) => {
    signinUser({ email, password })
      .then(() => history.push('/concerts'))
  }

  return (<Form onSubmit={ submittedValues => handleSubmit(submittedValues) }>
    { formApi => (<form onSubmit={formApi.submitForm}>
      <Text field="email" placeholder="이메일"/>
      <Text field="password" type="password" placeholder="비밀번호" />
      <button type="submit" className="btn btn-primary">로그인</button>
    </form>)
    }
  </Form>)
}

export default withRouter(connect(null, { signinUser })(SignIn))
