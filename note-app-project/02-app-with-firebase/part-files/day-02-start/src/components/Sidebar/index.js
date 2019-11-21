import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fuzzySearch from 'fuzzysearch';

import penUrl from './pen.svg';
import './style.scss';

export default function Sidebar({ links }) {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const asideRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handler = e => {
      // if click is happening from sidebar or something inside sidebar, then bail
      if (
        asideRef.current &&
        e.target &&
        (e.target === asideRef.current || asideRef.current.contains(e.target))
      ) {
        return;
      }

      // if click is happening from button, then also bail
      // because it has its own event listener
      if (
        buttonRef.current &&
        e.target &&
        (e.target === buttonRef.current || buttonRef.current.contains(e.target))
      ) {
        return;
      }

      setVisible(false);
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);

  let filteredLinks = links;
  if (search !== '') {
    filteredLinks = links.filter(link => {
      return fuzzySearch(search.toLowerCase(), link.label.toLowerCase());
    });
  }

  return (
    <>
      <aside
        className={classNames('menu main-menu', {
          'menu-is-visible': visible,
        })}
        ref={asideRef}
      >
        <div className="field">
          <div className="control has-icons-left">
            <input
              type="search"
              className="input"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
              placeholder="enter search term"
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
        {filteredLinks.length ? (
          <ul className="menu-list">
            {filteredLinks.map(link => (
              <li key={link.to}>
                <NavLink activeClassName="is-active" to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {search
              ? 'No notes found, try removing the filter'
              : 'No notes found. Please add some.'}
          </p>
        )}
      </aside>
      <button
        className="menu-toggler button"
        ref={buttonRef}
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

/*
[
  {
    label: string,
    to: string, (URL to link)
  }
]
*/

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
