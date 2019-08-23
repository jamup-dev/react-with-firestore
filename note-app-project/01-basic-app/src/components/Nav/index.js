import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from '../../logo.svg';
import './style.scss';

function Nav() {
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} height="28" alt="Notes App" />
            <span className="navbar-logo-text">Notes</span>
          </Link>
        </div>
        <div className="navbar-actions">
          <div className="buttons">
            <Link className="button is-primary" to="/new">
              + New Note
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
