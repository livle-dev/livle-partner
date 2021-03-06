import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    //새로 들어왔을땐 이게 아예 실행이 안됨
    if (localStorage.getItem('token')) {
      this.props.checkSession();
    }
  }

  render() {
    return <div>Hi, {this.props.data.company}</div>;
  }
}

function mapStateToProps(state) {
  return { data: state.auth };
}

export default connect(mapStateToProps, actions)(Feature);
