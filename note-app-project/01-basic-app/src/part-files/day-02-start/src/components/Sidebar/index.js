import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import penUrl from './pen.svg';
import './style.scss';

export default function Sidebar() {
  // a state for toggling the menu
  const [visible, setVisible] = useState(false);
  // a state for managing search
  const [search, setSearch] = useState('');

  // refs for accessing DOM elements
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
        <div className="field">
          <div className="control has-icons-left">
            <input
              type="search"
              className="input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="search notes..."
            />
            <span
              className="icon is-small is-left"
              role="img"
              aria-label="Search Icon"
            >
              🔍
            </span>
          </div>
        </div>
        <p className="menu-label">Notes</p>
        <p>
          {search
            ? 'No notes found, try removing the filter.'
            : 'No notes found. Please add some.'}
        </p>
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
