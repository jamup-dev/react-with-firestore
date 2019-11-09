import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as Logo } from '../../logo.svg';
import './style.scss';
import { useSession } from '../../auth/user';
import firebase from '../../utils/firebase';
import Spinner from '../Spinner';

function Nav({ history }) {
  const session = useSession();
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <Logo />
            <span className="navbar-logo-text">Notes</span>
          </Link>
        </div>
        <div className="navbar-actions">
          {session.initializing ? (
            <Spinner inline />
          ) : (
            <div className="buttons">
              {session.user ? (
                <>
                  <Link className="button is-primary" to="/new">
                    + New Note
                  </Link>
                  <button
                    className="button is-danger"
                    data-testid="logoutbutton"
                    onClick={e => {
                      e.preventDefault();
                      firebase.auth().signOut();
                      history.push('/');
                      toast.success('Successfully logged out');
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link className="button is-primary" to="/signin">
                  Sign In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
