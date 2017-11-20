import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import reducers from './reducers';
import Header from './components/header';
//import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import Feature from './components/feature'
import CheckSession from './components/auth/session_check';
import TicketForm from './components/TicketForm'
import App from './components/app';
import {AUTH_USER} from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store=createStoreWithMiddleware(reducers);
//export const history = createHistory();
// const token = localStorage.getItem('token');
// //If we have a token, consider the user to be singed in
// if(token){
//     //we need to update application state
//     store.dispatch({type: AUTH_USER})
//     //이것도 다 reducer로 보내짐
// }


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.querySelector('.container'));

