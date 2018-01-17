import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signinUser } from '../../actions';

const SignIn = ({ history, signinUser }) => {
  const handleSubmit = ({ email, password }) => {
    signinUser({ email, password })
      .then(() => history.push('/concerts'))
      .catch(msg => alert(msg));
  };

  return (
    <div>
      <Form onSubmit={submittedValues => handleSubmit(submittedValues)}>
        {formApi => (
          <form onSubmit={formApi.submitForm}>
            <Text field="email" placeholder="이메일" />
            <Text field="password" type="password" placeholder="비밀번호" />
            <button type="submit" className="submit-button">
              로그인
            </button>
            <div className="find-password-button _flex _hcenter-position">
              <a href="/confirm" className="_fw-semi-bold _fs_22 _green-light">
                비밀번호 찾기
              </a>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default withRouter(connect(null, { signinUser })(SignIn));
