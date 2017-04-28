import axios from 'axios';

// this uses redux-thunk middleware and axios to post our form to the server

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData);
  }
}

export function doesUserExist(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}
