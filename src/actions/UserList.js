import axios from './axios';
import { FETCH_USERS, UPDATE_LIMIT } from './types';

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
