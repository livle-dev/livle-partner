import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../components/header'
import Feature from '../components/feature'
import TicketForm from '../components/TicketForm';
import Session from '../components/auth/Session';
import Signup from '../components/auth/signup'
import RequireAuth from '../components/auth/RequireAuth'
import * as actions from '../actions';

class App extends Component {

  constructor() {
    super();
    this.state = { ready: false }
  }


  componentWillMount() {
      console.log('App\'s componentWillMount');
    if (localStorage.getItem('token')) {
      this.props.checkSession().then(() => this.setState({ ready: true }));
    } else {
      this.setState({ ready: true })
    }
  }
  // componentWillUpdate(){
  //     if (localStorage.getItem('token')) {
  //         this.props.checkSession().then(() => this.setState({ ready: true }));
  //     }
  // }

    render() {
        return this.state.ready ? (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Session} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/feature" component={RequireAuth(Feature)} />
                        <Route path="/add" component={TicketForm} />
                    </Switch>
                </div>
            </BrowserRouter>
        ) : (
            <div>
              이 떄는 뭐가 안 떠야 정상
                <BrowserRouter>
                    <div>
                    <Header />
                       <Switch>
                           <Route exact path="/" component={Session} />
                           <Route path="/signup" component={Signup} />
                       </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


export default connect(null, actions)(App);
