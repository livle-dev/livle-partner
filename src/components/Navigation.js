import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutUser } from '../actions';
// image
import { logo } from '../images';

const Navigation = ({ user, signoutUser }) => (
  <nav className="_navbar _row-direction _vcenter-position">
    {user ? (
      <img src={logo.logo_livle_partner} className="_logo" />
    ) : (
      <div className="_full-container">
        <Link to="/concerts" className="_flex_1">
          <img src={logo.logo_livle_partner} className="_logo" />
        </Link>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/users">회원관리</Link>
            <Link to="/concerts">공연관리</Link>
            <Link to="/add">공연등록</Link>
          </li>
        </ul>
        <div>
          {user.company}님
          <Link onClick={signoutUser} className="nav-link" to="/">
            Sign Out
          </Link>
        </div>
      </div>
    )}
  </nav>
);

function mapStateToProps(state) {
  return {
    user: state.auth,
  };
}
export default connect(mapStateToProps, { signoutUser })(Navigation);
