import axios from '../actions/axios'
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
    } from "../actions/types";


export default function(state={}, action){
    switch(action.type){
        case AUTH_USER:
        {
          if(action.payload.token) {
            localStorage.setItem('token', action.payload.token); //-Save the JWT token
            axios.defaults.headers = { Authorization: localStorage.getItem('token') } // Fill header
          }
          const isAdmin = action.payload.username.endsWith("@livle.kr");
          return { ...action.payload, authenticated: true, isAdmin: isAdmin }
        }
        case UNAUTH_USER:
        {
          localStorage.removeItem('token');
          axios.defaults.headers = { }; // Empty header
          return {authenticated: false};
        }
        case AUTH_ERROR:
            return {...state, error:action.payload};
        case FETCH_MESSAGE:
            return {...state, message: action.payload}
    }
    return state
}
