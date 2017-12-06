import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './components/Navigation'
import Session from './components/Session';
import RequireAuth from './components/RequireAuth'
import ConcertList from './components/ConcertList'
import UserList from './components/UserList'
import TicketForm from './components/TicketForm';

import { checkSession } from './actions';

class App extends Component {

  state = { ready: false }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.props.checkSession().then(() => {
        this.setState({ ready: true });
        console.log('App부분, promise resolve')

      }).catch(()=>{
        this.setState({ ready:true })
      })
    } else {
      this.setState({ ready: true })
    }
  }

  render() {
    return this.state.ready ? (
      <BrowserRouter>
        <div>
          { this.props.authenticated && <Navigation /> }
          <Switch>
            <Route exact path="/" component={Session} />
            <Route path="/concerts" component={RequireAuth(ConcertList)} />
            <Route path="/users" component={RequireAuth(UserList)} />
            <Route path="/add" component={RequireAuth(TicketForm)} />
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

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, { checkSession })(App);
