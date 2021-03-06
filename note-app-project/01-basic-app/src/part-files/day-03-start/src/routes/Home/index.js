import React from 'react';
import { Link } from 'react-router-dom';

import logoUrl from '../../logo.svg';
import './style.scss';

export default function Home() {
  return (
    <section className="section notes-home">
      <div className="notes-home__imgwrap">
        <img src={logoUrl} className="notes-home__img" alt="Take Notes" />
      </div>
      <h2 className="notes-home__title title is-2 has-text-black-ter">
        Notes App
      </h2>
      <h3 className="notes-home__subtitle subtitle is-3 has-text-grey">
        Take notes, never forget
      </h3>
      <p className="is-size-5 has-text-grey-light">
        Welcome to your notes. Add new notes, read and edit existing and more.
        Synced live to all your devices.
      </p>
      <div className="notes-home__newnote">
        <Link
          to="/new"
          className="button is-success is-large is-fullwidth is-outlined"
        >
          New Note
        </Link>
      </div>
    </section>
  );
}
