import axios from './axios';
import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from './types';

export function signinUser({ email, password }) {
  return dispatch => {
    // Submit email/password to the server
    return axios
      .post('/partner/session', {
        username: email,
        password: password,
      })
      .then(response => {
        dispatch(authUser(response.data));
        Promise.resolve();
      })
      .catch(e => {
        return Promise.reject(e.response.data.message);
      });
  };
}

function authUser(data) {
  return {
    type: AUTH_USER,
    payload: data,
  };
}

export function signupUser({ email, password, company }) {
  return dispatch =>
    axios
      .post('/partner', {
        company: company,
        username: email,
        password: password,
      })
      .then(response => {
        alert('가입되었습니다! 승인을 기다려주세요.');
        return Promise.resolve();
      })
      .catch(error => {
        //dispatch(authError(error.response.data.message))
        return Promise.reject(error.response.data.message);
      });
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signoutUser() {
  return { type: UNAUTH_USER };
}

export function checkSession() {
  return dispatch =>
    axios
      .get('/partner')
      .then(res => {
        dispatch(authUser(res.data));
        return Promise.resolve();
      })
      .catch(e => {
        dispatch(signoutUser());
        return Promise.reject(e.response);
      });
}
