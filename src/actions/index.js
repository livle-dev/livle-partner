import axios from './axios';
import {AUTH_ERROR, AUTH_USER, UNAUTH_USER, FETCH_MESSAGE} from "./types";

function authUser(data) {
  return {
    type: AUTH_USER,
    payload: data
  }
}

export function signinUser({email, password}, callback){

    return function(dispatch){ //다똑같아
        //Submit email/password to the server
        axios.get("/partner/session", { params: { username: email, password: password } })
            .then(response=>{ //200 or 204인 경우 them을 hit함
                //If request is good...
              dispatch(authUser(response.data));
                callback();
            })
            .catch((e)=>{
                //If request is bad
                //- Show an error to the user
                console.log(e.response.data.message);
                dispatch(authError(e.response.data.message))
            })
    }
}

export function signupUser({email, password, company}, callback){
    return function(dispatch){
        axios.post("/partner", { company: company, username: email, password: password})
            .then(response => {
              dispatch(authUser(response.data));
              callback();
            })
            .catch(error=>{
                return dispatch(authError(error.response.data.message))})
    }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser(){

    return {type: UNAUTH_USER};
}

export function fetchMessage(){
    return function(dispatch){
        axios.get('')
            .then(response=>{
                console.log(response);
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data
                })
            })
    }
}


export function checkSession() {
  return dispatch => axios.get('/partner')
    .then(res => {
        console.log('dispatch, then');
      dispatch(authUser(res.data));
        return Promise.resolve()
    })
    .catch((e)=>{
      console.log('dispatch, catch');
      dispatch(signoutUser());
        return Promise.reject()
    })
}

export function createTicket(values) {
  return dispatch => axios.post("/ticket", values)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

export function getSignedUrl(file, callback) {
  return dispatch => axios.get('/file')
    .then(res => callback(res.data))
    .catch(error => console.error(error))
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
