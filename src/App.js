import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Feature from './components/feature'
import TicketForm from './components/TicketForm';
import Session from './components/Session';
import RequireAuth from './components/RequireAuth'
import ConcertList from './components/ConcertList'
import * as actions from './actions';

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
                    <Switch>
                      <Route exact path="/" component={Session} />
                      <Route path="/concerts" component={RequireAuth(ConcertList)} />
                      <Route path="/add" component={TicketForm} />
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
