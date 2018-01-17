import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { withRouter } from 'react-router-dom';
import axios from '../../actions/axios';

class ChangePassword extends Component {
  constructor(props) {
    super();
    this.state = { token: props.match.params.token };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit({ password, passwordCheck }) {
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else if (password.length < 6 || passwordCheck.length < 6) {
      alert('6자리 이상의 비밀번호를 설정해 주세요');
      return;
    }
    axios
      .patch('/user/password', {
        params: { password, token: this.state.token },
      })
      .then(response => {
        alert('비밀번호를 변경했습니다.');
        history.push('/');
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    return (
      <Form
        class="temporaryFormStyle"
        onSubmit={submittedValues => this.handleSubmit(submittedValues)}>
        {formApi => (
          <form onSubmit={formApi.submitForm}>
            <Text
              field="password"
              type="password"
              placeholder="새로운 비밀번호(6자 이상)"
            />
            <Text
              field="passwordCheck"
              type="password"
              placeholder="새로운 비밀번호 확인"
            />
            <button type="submit">Change Password</button>
          </form>
        )}
      </Form>
    );
  }
}

export default withRouter(ChangePassword);
