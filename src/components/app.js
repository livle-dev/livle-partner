import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../components/header'
import Feature from '../components/feature'
import TicketForm from '../components/TicketForm'
import Session from '../components/auth/Session'
import Signup from '../components/auth/signup'
import RequireAuth from '../components/auth/RequireAuth'
import * as actions from '../actions'

import Payment from '../components/Payment'

class App extends Component {

  constructor() {
    super();
    this.state = { ready: false }
  }


  componentWillMount() {
      console.log('App\'s componentWillMount');
    if (localStorage.getItem('token')) {
      this.props.checkSession().then(() => {
          this.setState({ ready: true });
            console.log('App부분, promise resolve')

      }).catch(()=>{
          this.setState({ready:true})
      })
    }else {
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
                        <Route path="/pay" component={Payment} />
                    </Switch>
                </div>
            </BrowserRouter>
        ) : (
            <div>
              Loading...
            </div>
        )
    }
}


export default connect(null, actions)(App);
