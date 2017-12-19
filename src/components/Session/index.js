import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './Signup';
// images
import session_bg from '../../images/background/session_bg.png';
import { background } from '../../styles/javascript';

class Session extends Component {
  state = { signUp: false };

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push('/concerts');
    }
  }

  render() {
    return (
      <div
        className="_fullscreen _flex _hcenter-position _vcenter-position"
        style={background(session_bg)}
      >
        <div>
          <div className="_flex">
            <div onClick={e => this.setState({ signUp: false })}>LOG IN</div>
            <div onClick={e => this.setState({ signUp: true })}>SIGN UP</div>
          </div>
          <div>{this.state.signUp ? <SignUp /> : <SignIn />}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps, {})(Session));
