import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

export default class Session extends Component {
  render() {
    return (<div>
      <div>로고가 떠있다</div>
      <div>
        <div style={ { display: "flex" } }>
          <div>
            LOG IN
          </div>
          <div>
            SIGN UP
          </div>
        </div>
        <div>
          <form>
          </form>
        </div>
      </div>
      </div>)
  }
}
