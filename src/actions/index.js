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
  PATCH_CONCERT,
  UPDATE_LIMIT,
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

export function signupUser({ email, password, company }) {
  return dispatch =>
    axios
      .post('/partner', {
        company: company,
        username: email,
        password: password,
      })
      .then(response => {
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
        dispatch(authUser(res.data));
        return Promise.resolve();
      })
      .catch(e => {
        dispatch(signoutUser());
        return Promise.reject(e.response);
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

export function patchTicket(value, id, partner_id) {
  value.id = id;
  value.partner_id = partner_id;
  return dispatch =>
    axios
      .patch(`/ticket/${value.id}`, value)
      .then(res => {
        dispatch(_patchConcert(res.data));
        Promise.resolve();
      })
      .catch(err => Promise.reject(err));
}

function _patchConcert(data) {
  return {
    type: PATCH_CONCERT,
    payload: data,
  };
}

function _fetchConcert(data) {
  return {
    type: PATCH_CONCERT,
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
      .get('/partner/list', { params: { page: 1 } })
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
      .get('/user/list', { params: { page: 1 } })
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
      .get('/ticket/list', { params: { page: 1 } })
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

export function updateLimit(subscriptionId, limit) {
  return dispatch =>
    axios
      .patch(`/subscription/${subscriptionId}/limit`, { limit })
      .then(res => dispatch(_updateLimit(subscriptionId, limit)))
      .catch(err => Promise.reject(err.response.data));
}

function _updateLimit(subscriptionId, limit) {
  return {
    type: UPDATE_LIMIT,
    payload: { subscriptionId, limit },
  };
}

export function fetchConcertDetail() {
  // TODO : implement
}

export const fetchPartnersByCompany = (company) =>
  axios.get(`/partner/list?page=1&company=${company}`)

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
