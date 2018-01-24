import axios from './axios';
import { FETCH_PARTNERS, UPDATE_PARTNER } from './types';

export function fetchPartners(approved, page = 1) {
  return dispatch =>
    axios
      .get('/partner/list', { params: { page: page, approved: approved } })
      .then(res => dispatch(_fetchPartners(res.data)))
      .catch(err => Promise.reject(err.response.data));
}

export const fetchPartnersByCompany = company =>
  axios.get('/partner/list', { params: { page: 1, company: company } });

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
      .then(res => {
        dispatch(updatePartner(res.data));
        return Promise.resolve();
      })
      .catch(err => Promise.reject(err.response));
}

function updatePartner(data) {
  return {
    type: UPDATE_PARTNER,
    payload: data,
  };
}
