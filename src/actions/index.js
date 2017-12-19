import axios from './axios';
import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,
  FETCH_PARTNERS,
  FETCH_USERS,
  FETCH_CONCERTS,
  CREATE_CONCERT,
  REPLACE_PARTNER,
} from './types';

function authUser(data) {
  return {
    type: AUTH_USER,
    payload: data,
  };
}

export function signinUser({ email, password }) {
  return dispatch => {
    // Submit email/password to the server
    return axios
      .get('/partner/session', {
        params: { username: email, password: password },
      })
      .then(response => {
        //200 or 204인 경우 them을 hit함
        //If request is good...
        dispatch(authUser(response.data));
        Promise.resolve();
      })
      .catch(e => {
        //If request is bad
        //- Show an error to the user
        //dispatch(authError(e.response.data.message))
        return Promise.reject(e.response.data.message);
      });
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
        console.log('succ');
        // Should not be logged in before approval of livle admin
        // dispatch(authUser(response.data));
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

export function fetchMessage() {
  return function(dispatch) {
    axios.get('').then(response => {
      console.log(response);
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data,
      });
    });
  };
}

export function checkSession() {
  return dispatch =>
    axios
      .get('/partner')
      .then(res => {
        console.log('dispatch, then');
        dispatch(authUser(res.data));
        return Promise.resolve();
      })
      .catch(e => {
        console.log('dispatch, catch');
        dispatch(signoutUser());
        return Promise.reject();
      });
}

export function createTicket(values) {
  return dispatch =>
    axios
      .post('/ticket', values)
      .then(res => dispatch(_createConcert(res.data)))
      .catch(err => Promise.reject(err.response.data));
}

function _createConcert(data) {
  return {
    type: CREATE_CONCERT,
    payload: data,
  };
}

export function getSignedUrl(file, callback) {
  return dispatch =>
    axios
      .get('/file')
      .then(res => callback(res.data))
      .catch(error => console.error(error));
}

export function fetchPartners() {
  return dispatch =>
    axios
      .get('/partner/all')
      .then(res => dispatch(_fetchPartners(res.data)))
      .catch(err => Promise.reject(err.response.data));
}

function _fetchPartners(data) {
  return {
    type: FETCH_PARTNERS,
    payload: data,
  };
}

export function fetchUsers() {
  return dispatch =>
    axios
      .get('/user/all')
      .then(res => dispatch(_fetchUsers(res.data)))
      .catch(err => Promise.reject(err.response.data));
}

function _fetchUsers(data) {
  return {
    type: FETCH_USERS,
    payload: data,
  };
}

export function fetchConcerts() {
  return (dispatch, getState) => {
    if (getState().concertList.length > 0) return Promise.resolve();
    return axios
      .get('/ticket/all')
      .then(res => dispatch(_fetchConcerts(res.data)))
      .catch(err => Promise.reject(err.response.data));
  };
}

function _fetchConcerts(data) {
  return {
    type: FETCH_CONCERTS,
    payload: data,
  };
}

export function approvePartner(id) {
  return dispatch =>
    axios
      .post(`/partner/${id}/approve`)
      .then(res => dispatch(replacePartner(res.data)))
      .catch(err => Promise.reject(err.response.data));
}

function replacePartner(data) {
  return {
    type: REPLACE_PARTNER,
    payload: data,
  };
}

export function fetchConcertDetail() {
  // TODO : implement
}
//아래는 redux-promise로 했을 때 - much more readable
// export function fetchMessage(){
//     const request= axios.get(ROOT_URL, {
//         headers: {authorization: localStorage.getItem('token')}
//     });
//     return {
//         type: FETCH_MESSAGE,
//         payload: request
//     }
// }
