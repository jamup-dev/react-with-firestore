import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import penUrl from './pen.svg';
import './style.scss';

export default function Sidebar({ links }) {
  // a state for toggling the menu
  const [visible, setVisible] = useState(false);
  const asideRef = useRef();
  const buttonRef = useRef();

  // we want to close the open sidebar if clicked outside
  // the sidebar
  useEffect(() => {
    const handler = e => {
      // return if came from sidebar
      if (
        asideRef.current &&
        e.target &&
        (asideRef.current === e.target || asideRef.current.contains(e.target))
      ) {
        return;
      }
      // return if came from the button, because it has it's own listener
      if (
        buttonRef.current &&
        e.target &&
        (buttonRef.current === e.target || buttonRef.current.contains(e.target))
      ) {
        return;
      }
      // if it is already false, then react will not re-render it
      // so we are good.
      setVisible(false);
    };
    document.addEventListener('click', handler);

    // return cleanup function
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <aside
        ref={asideRef}
        className={classNames('menu main-menu', {
          'menu-is-visible': visible,
        })}
      >
        <p className="menu-label">Notes</p>
        {links.length ? (
          <ul className="menu-list">
            {links.map(link => (
              <li key={link.to}>
                <NavLink activeClassName="is-active" to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes found. Please add some.</p>
        )}
      </aside>
      <button
        ref={buttonRef}
        className="menu-toggler button"
        onClick={e => {
          e.preventDefault();
          setVisible(!visible);
        }}
      >
        <img src={penUrl} alt="Toggle Sidebar" />
      </button>
    </>
  );
}

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
