import axios from './axios';
import { FETCH_PARTNERS, REPLACE_PARTNER } from './types';

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

export const fetchPartnersByCompany = company =>
  axios.get(`/partner/list?page=1&company=${company}`);
