import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import penUrl from './pen.svg';
import './style.scss';

export default function Sidebar({ links }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <aside
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
