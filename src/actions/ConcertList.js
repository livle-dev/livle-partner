import axios from './axios';
import {
  FETCH_DUE_CONCERTS,
  FETCH_END_CONCERTS,
  CREATE_DUE_CONCERT,
  PATCH_DUE_CONCERT,
} from './types';

export function createTicket(values) {
  return dispatch =>
    axios
      .post('/ticket', values)
      .then(res => dispatch(_createConcert(res.data)))
      .catch(err => Promise.reject(err.response));
}

function _createConcert(data) {
  return {
    type: CREATE_DUE_CONCERT,
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
      .catch(err => Promise.reject(err.response));
}

function _patchConcert(data) {
  return {
    type: PATCH_DUE_CONCERT,
    payload: data,
  };
}

export function getSignedUrl(file, callback) {
  return dispatch =>
    axios
      .get('/file')
      .then(res => callback(res.data))
      .catch(err => Promise.reject(err.response));
}

export function fetchConcerts(state, page = 1) {
  return (dispatch, getState) => {
    if (getState().concertList.length > 0) return Promise.resolve();
    return axios
      .get('/ticket/list', { params: { page: page, state: state } })
      .then(res => dispatch(_fetchConcerts(state, res.data)))
      .catch(err => Promise.reject(err.response));
  };
}

function _fetchConcerts(state, data) {
  let type;
  switch (state) {
    case 'due':
      type = FETCH_DUE_CONCERTS;
      break;
    case 'end':
      type = FETCH_END_CONCERTS;
      break;
  }
  return { type: type, payload: data };
}

export function fetchConcertDetail() {
  // TODO : implement
}
