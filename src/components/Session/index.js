import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignIn from './SignIn'
import SignUp from './Signup'

class Session extends Component {

  state = { signUp: false };

  componentWillMount() {
    if(this.props.authenticated) {
      this.props.history.push('/concerts')
    }
  }

  render() {
    return (<div>
      <div>로고가 떠있다</div>
      <div>
        <div style={ { display: "flex" } }>
          <div onClick={ e => this.setState({ signUp: false })}>
            LOG IN
          </div>
          <div onClick={ e => this.setState({ signUp: true })}>
            SIGN UP
          </div>
        </div>
        <div>
          { this.state.signUp ? <SignUp /> : <SignIn /> }
        </div>
      </div>
      </div>)
  }
}

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated }
}

export default withRouter(
  (
    connect(mapStateToProps, { })(Session)
  )
)
