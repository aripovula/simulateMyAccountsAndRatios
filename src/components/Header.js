import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
      <h1>Simulate accounts and ratios</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
      <NavLink to="/create" activeClassName="is-active">Make a new posting</NavLink>
      <NavLink to="/help" activeClassName="is-active">Help</NavLink>
        <Link className="header__title" to="/dashboard">
        </Link>

        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

export default Header;



