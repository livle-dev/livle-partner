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

// function stringToCode(data) {
//   return data.split('\n').map(line => {
//     return (
//       <span key={line[0]}>
//         {line}
//         <br />
//       </span>
//     );
//   });
// }

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
        <div className="session-container _row-direction">
          <div className="typo-container">
            <p className="_fs_48 _fw-semi-bold _white">
              {stringToCode(strings.typoTitle)}
            </p>
            <p className="_fs_22 _fw-normal _white">
              {stringToCode(strings.typoContent)}
            </p>
          </div>

          <div className="login-box-container _hcenter-position">
            <div className="_row-direction">
              <div
                className="_flex_1 _hcenter-position _vcenter-position"
                onClick={e => this.setState({ signUp: false })}
              >
                <p>LOG IN</p>
              </div>
              <div
                className="_flex_1 _hcenter-position _vcenter-position"
                onClick={e => this.setState({ signUp: true })}
              >
                <p>SIGN UP</p>
              </div>
            </div>
            <div>{this.state.signUp ? <SignUp /> : <SignIn />}</div>
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
