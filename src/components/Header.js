import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div>
      <div className="header__content">
      
      &nbsp; Simulate accounts and ratios
        <span className="horIndent"></span><span className="horIndent"></span>
        <NavLink to="/" className="normal" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <span className="horIndent"></span>|<span className="horIndent"></span>
        <NavLink to="/createposting" className="normal" activeClassName="is-active">Make a new posting</NavLink>
        <span className="horIndent"></span>|<span className="horIndent"></span>
        <NavLink to="/help" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Help</NavLink>
        <span className="horIndent"></span><span className="horIndent"></span>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      
    </div>
  </div>
  </header>
);

export default Header;



