import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import axios from '../../actions/axios';
import { patchTicket } from '../../actions/index';
// view
import SessionContainer from './SessionContainer';

class ConfirmEmail extends Component {
  constructor() {
    super();
    this.state = { email: '', emailComplete: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ email }) {
    axios
      .get('/user/password', {
        params: { email },
      })
      .then(response => {
        this.setState({ email, emailComplete: true });
      })
      .catch(e => {
        if (e.response.status === 404) {
          alert('해당하는 유저가 없습니다');
        } else {
          alert('이메일이 없거나 잘못된 형식입니다');
        }
      });
  }

  render() {
    return (
      <SessionContainer>
        <div
          className="login-box-container _flex _column-direction _vcenter-position"
          style={{ height: '40rem' }}>
          <p className="login-box-title _fs_36 _white _fw-semi-bold">
            비밀번호 찾기
          </p>
          <div className="form-continer _flex_1 _vcenter-position _hcenter-position">
            {this.state.emailComplete ? (
              <div>
                <p className="_fs_22 _fw-semi-bold _green-light">
                  {this.state.email}
                </p>
                <p
                  className="_text-center _fs_22 _fw-semi-bold _white"
                  style={{ marginTop: '4rem' }}>
                  입력하신 이메일 주소로<br />인증메일이 전송되었습니다.
                </p>
              </div>
            ) : (
              <Form
                class="temporaryFormStyle"
                onSubmit={submittedValues =>
                  this.handleSubmit(submittedValues)
                }>
                {formApi => (
                  <form onSubmit={formApi.submitForm}>
                    <Text field="email" placeholder="이메일" />
                    <button type="submit" className="submit-button">
                      이메일 전송
                    </button>
                  </form>
                )}
              </Form>
            )}
          </div>
        </div>
      </SessionContainer>
    );
  }
}

export default ConfirmEmail;
