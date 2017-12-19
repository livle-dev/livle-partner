import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './Signup';
// images
import session_bg from '../../images/background/session_bg.png';
// style
import { background } from '../../styles/javascript';
import { strings, stringToCode } from '../../strings';

class Session extends Component {
  state = { isLogin: true };

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push('/concerts');
    }
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div
        id="session"
        className="_fullscreen _flex _hcenter-position _vcenter-position"
        style={background(session_bg)}
      >
        <div className="session-container _row-direction">
          <div className="typo-container _column-direction _hcenter-position">
            <div className="typo-title">
              <p className="_fs_48 _fw-semi-bold _white">
                {stringToCode(strings.typoTitle)}
              </p>
            </div>
            <div className="typo-text">
              <p className="_fs_22 _fw-normal _lh-1 _white">
                {stringToCode(strings.typoContent)}
              </p>
            </div>
          </div>

          <div className="login-box-container _column-direction _vcenter-position">
            <div className="select-container _row-direction">
              <div
                className={`_flex_1 _hcenter-position _vcenter-position ${!isLogin &&
                  'unselected-container'}`}
                onClick={e => this.setState({ isLogin: true })}
              >
                <p className="_fs_36 _fw-bold _ls-4 _white">LOG IN</p>
              </div>
              <div
                className={`_flex_1 _hcenter-position _vcenter-position ${isLogin &&
                  'unselected-container'}`}
                onClick={e => this.setState({ isLogin: false })}
              >
                <p className="_fs_36 _fw-bold _ls-4 _white">SIGN UP</p>
              </div>
            </div>
            <div>{this.state.isLogin ? <SignIn /> : <SignUp />}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps, {})(Session));
