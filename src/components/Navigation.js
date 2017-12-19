import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutUser } from '../actions';

const Navigation = ({ user, signoutUser }) => (
  <nav className="navbar navbar-light">
    <Link to="/concerts" className="navbar-brand">
      Livle
    </Link>
    {user.isAdmin && (
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/users">회원관리</Link>
          <Link to="/concerts">공연관리</Link>
          <Link to="/add">공연등록</Link>
        </li>
      </ul>
    )}
    <div>
      {user.company}님
      <Link onClick={signoutUser} className="nav-link" to="/">
        Sign Out
      </Link>
    </div>
  </nav>
);

function mapStateToProps(state) {
  return {
    user: state.auth,
  };
}
export default connect(mapStateToProps, { signoutUser })(Navigation);
