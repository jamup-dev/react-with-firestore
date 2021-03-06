import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import ButtonFooter from '../ButtonFooter';

export default function NoteForm({
  initialTitle = '',
  initialNote = '',
  cancelLink = '/',
  cancelLabel = 'Cancel',
  onSave,
}) {
  // internal states for handling form errors
  const [titleError, setTitleError] = useState(false);
  const [noteError, setNoteError] = useState(false);

  // what to do when form submits?
  const handler = e => {
    // prevent form submit
    e.preventDefault();
    // get title and note
    const title = e.target['note-title'].value;
    const note = e.target['note-note'].value;
    // check for errors
    let hasError = false;
    if (title === '') {
      setTitleError(true);
      hasError = true;
    }
    if (note === '') {
      setNoteError(true);
      hasError = true;
    }
    // if has error, then bail here
    if (hasError) {
      return;
    }
    // else, reset all errors and call onSave from parent
    setTitleError(false);
    setNoteError(false);
    onSave({ title, note });
  };

  return (
    <div className="note-app-form">
      <form onSubmit={handler} data-testid="noteform">
        <div className="field">
          <label className="label" htmlFor="note-title">
            Title
          </label>
          <div className="control">
            <input
              id="note-title"
              data-testid="note-title"
              type="text"
              placeholder="Note title"
              className="input is-large"
              defaultValue={initialTitle}
            />
          </div>
          {titleError ? (
            <p className="help is-danger">Please enter a title</p>
          ) : null}
        </div>
        <div className="field">
          <label className="label" htmlFor="note-note">
            Note
          </label>
          <div className="control">
            <textarea
              name="note-note"
              data-testid="note-note"
              id="note-note"
              rows="10"
              className="textarea is-medium"
              defaultValue={initialNote}
              placeholder="Markdown allowed"
            />
          </div>
          {noteError ? (
            <p className="help is-danger">Please enter a note</p>
          ) : null}
        </div>
        <ButtonFooter>
          <div className="control">
            <button
              className="button is-primary"
              type="submit"
              data-testid="submit-button"
            >
              Submit
            </button>
          </div>
          <div className="control">
            <Link className="button is-white" to={cancelLink}>
              {cancelLabel}
            </Link>
          </div>
        </ButtonFooter>
      </form>
    </div>
  );
}
