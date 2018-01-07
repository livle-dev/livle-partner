import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signoutUser } from '../actions';
// image
import { logo } from '../images';

const Navigation = ({ user, signoutUser, location }) => {
  const checkAuth = user.id;
  const checkLocation = (path) => location.pathname === path

  return (
    <nav
      className="_navbar"
      style={{ position: checkAuth ? 'relative' : 'absolute' }}>
      {checkAuth ? (
        <div className="_full-container _row-direction _vcenter-position">
          <Link to="/concerts" className="_flex_1 _vcenter-position">
            <img
              src={
                user.isAdmin ? logo.logo_livle_admin : logo.logo_livle_partner
              }
              className="_logo"
            />
          </Link>
          {user.isAdmin && (
            <div className="_selecotr-container _row-direction">
              <div
                className={`_selector _flex _vcenter-position _hcenter-position
                  ${checkLocation('/users') && '_selector-border'}`}>
                  <Link to="/users" className="_white _fs_20">
                    회원관리
                  </Link>
                </div>
                <div
                  className={`_selector _flex _vcenter-position _hcenter-position
                  ${checkLocation('/concerts') && '_selector-border'}`}>
                    <Link to="/concerts" className="_white _fs_20">
                      공연관리
                    </Link>
                  </div>
                  <div
                    className={`_selector _flex _vcenter-position _hcenter-position
                  ${checkLocation('/add') && '_selector-border'}`}>
                  <Link to="/add" className="_white _fs_20">
                    공연등록
                  </Link>
                </div>
              </div>
          )}
          <p className="_flex _vcenter-position _white _fs_20">
            {user.company}님
          </p>
          <Link
            onClick={signoutUser}
            className="_logout-button _flex _vcenter-position _hcenter-position"
            to="/">
            Logout
          </Link>
        </div>
      ) : (
        <div className="_full-container _row-direction _vcenter-position">
          <img src={logo.logo_livle_partner} className="_logo" />
        </div>
      )}
    </nav>
  );
}

function mapStateToProps(state) {
  return { user: state.auth };
}
export default withRouter(connect(mapStateToProps, { signoutUser })(Navigation));
