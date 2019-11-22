import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import fuzzySearch from 'fuzzysearch';

import { useSession } from '../../utils/auth';
import penUrl from './pen.svg';
import './style.scss';
import { useNotes } from '../../utils/note';

export default function Sidebar({ links }) {
  // a state for toggling the menu
  const [visible, setVisible] = useState(false);
  // a state for managing search
  const [search, setSearch] = useState('');
  // check login status for proper message
  const session = useSession();

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

  // get notes from context
  const notes = useNotes();
  let filteredLinks = notes.map(note => ({
    label: note.title,
    to: `/note/${note.id}`,
  }));
  // fuzzy search and filter links
  if (search !== '' && typeof search === 'string') {
    filteredLinks = filteredLinks.filter(link =>
      fuzzySearch(search.toLowerCase(), link.label.toLowerCase())
    );
  }

  return (
    <>
      <aside
        ref={asideRef}
        className={classNames('menu main-menu', {
          'menu-is-visible': visible,
        })}
      >
        {session.user ? (
          <>
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
                  ? 'No notes found, try removing the filter.'
                  : 'No notes found. Please add some.'}
              </p>
            )}
          </>
        ) : (
          <p className="is-size-5" data-testid="sidebar-logout-msg">
            Please sign in to access your notes!
          </p>
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
