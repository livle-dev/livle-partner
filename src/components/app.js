import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../components/header'
import Feature from '../components/feature'
import TicketForm from '../components/TicketForm';
import Signin from '../components/auth/signin';
import Signup from '../components/auth/signup'
import RequireAuth from '../components/auth/require_auth';
import * as actions from '../actions';

class App extends Component {


    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.props.checkSession(function(){
                this.props.history.push('/feature');
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Signin} />
                        {/*<Route path="/signout" component={Signout} />*/}
                        <Route path="/signup" component={Signup} />
                        <Route path="/feature" component={RequireAuth(Feature)} />
                        <Route path="/add" component={TicketForm} />

                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


export default connect(null, actions)(App);