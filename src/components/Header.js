import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div>
      <div className="header__content">      
      &nbsp; Simulate accounts and ratios
        <span className="horIndent"></span><span className="horIndent"></span>
        
        <NavLink
          to="/"
          style={{color: 'white', textDecoration: 'none'}}
          activeStyle={{color: 'red', textDecoration: 'none'}}
          exact={true}
          >Dashboard
        </NavLink>

        <span className="horIndent"></span>|<span className="horIndent"></span>
        
        <NavLink 
          to="/postings"
          style={{color: 'white', textDecoration: 'none'}}
          activeStyle={{color: 'red', textDecoration: 'none'}}
          exact={true}
          >All postings
        </NavLink>
        
        <span className="horIndent"></span>|<span className="horIndent"></span>
        
        <NavLink
          to="/createposting"
          style={{color: 'white', textDecoration: 'none'}}
          activeStyle={{color: 'red', textDecoration: 'none'}}
          >New posting
        </NavLink>
        
        <span className="horIndent"></span>|<span className="horIndent"></span>
        
        <NavLink
          to="/help"
          style={{color: 'white', textDecoration: 'none'}}
          activeStyle={{color: 'red', textDecoration: 'none'}}
          >Help
        </NavLink>
        
        <span className="horIndent"></span><span className="horIndent"></span>
        {/*<button className="button button--link" onClick={startLogout}>Logout</button>*/}
    </div>
  </div>
  </header>
);

export default Header;



