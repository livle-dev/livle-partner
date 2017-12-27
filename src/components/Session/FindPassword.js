import React, { Component } from "react";
import { Form, Text } from "react-form";

import axios from "../../actions/axios";
import { patchTicket } from "../../actions/index";

class FindPassword extends Component {
  constructor() {
    super();
    this.state = { email: "", emailComplete: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit({ email }) {
    axios
      .get("/user/password", {
        params: { email }
      })
      .then(response => {
        console.log("hi");
        console.log(response);
        this.setState({ email, emailComplete: true });
      })
      .catch(e => {
        if (e.response.status === 404) {
          alert("해당하는 유저가 없습니다");
        } else {
          alert("이메일이 없거나 잘못된 형식입니다");
        }
      });
  }

  render() {
    return (
      <div>
        <h1>비밀번호 찾기</h1>
        {this.state.emailComplete ? (
          <div>
            <h1>{this.state.email}</h1>
            <p>입력해 주신 계정으로 확인 메일 보냄</p>
          </div>
        ) : (
          <Form
            class="temporaryFormStyle"
            onSubmit={submittedValues => this.handleSubmit(submittedValues)}
          >
            {formApi => (
              <form onSubmit={formApi.submitForm}>
                <Text field="email" placeholder="이메일" />
                <button type="submit">Send Email</button>
              </form>
            )}
          </Form>
        )}
      </div>
    );
  }
}

export default FindPassword;
