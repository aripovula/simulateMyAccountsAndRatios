import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


export const Header = ({ startLogout }) => (
  <header className="header fixedElement">
    <div>
      <div className="header__content">
        &nbsp; Simulate accounts and ratios
        <span className="horIndent"></span><span className="horIndent"></span>

        <NavLink
          to="/dashboard"
          style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}
          activeStyle={{ color: 'red', textDecoration: 'none' }}
          exact={true}
        >Dashboard
        </NavLink>

        <span className="horIndent"></span>|<span className="horIndent"></span>

        <NavLink
          to="/postings"
          style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}
          activeStyle={{ color: 'red', textDecoration: 'none' }}
          exact={true}
        >All postings
        </NavLink>

        <span className="horIndent"></span>|<span className="horIndent"></span>

        <NavLink
          to="/createposting"
          style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}
          activeStyle={{ color: 'red', textDecoration: 'none' }}
        >New posting
        </NavLink>

        <span className="horIndent"></span>|<span className="horIndent"></span>

        <NavLink
          to="#"
          style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}
          activeStyle={{ color: 'red', textDecoration: 'none' }}
        >Link to Github repo
        </NavLink>

        <span className="horIndent"></span>|<span className="horIndent"></span>

        <NavLink
          to="#"
          onClick={startLogout}
          style={{ color: 'white', textDecoration: 'none', fontSize: '14px', float: 'right' }}
          activeStyle={{ color: 'red', textDecoration: 'none' }}
        >Logout
        </NavLink>


        <span className="horIndent"></span><span className="horIndent"></span>
        {/*<button className="button button--link" onClick={startLogout}>Logout</button>*/}
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);




