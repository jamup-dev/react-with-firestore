import React, { useContext, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Switch, Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import NoteForm from '../../components/NoteForm';
import ButtonFooter from '../../components/ButtonFooter';
import { notesCtx, getPosition, noteDispatchCtx } from '../../utils/note';
import Error404 from '../../components/404';

function EditNote({ note, history }) {
  const dispatch = useContext(noteDispatchCtx);

  return (
    <NoteForm
      initialTitle={note.title}
      initialNote={note.note}
      onSave={val => {
        console.log(val);
        dispatch({
          type: 'update',
          payload: {
            id: note.id,
            title: val.title,
            note: val.note,
          },
        });
        toast.success('Note updated');
        history.push(`/note/${note.id}`);
      }}
      cancelLink={`/note/${note.id}`}
    />
  );
}

function ViewNote({ note, match, history }) {
  const dispatch = useContext(noteDispatchCtx);
  if (note === undefined) {
    return <Error404 />;
  }
  return (
    <>
      <h2 className="title is-2">{note.title}</h2>
      <div className="content">
        <Markdown>{note.note}</Markdown>
      </div>
      <ButtonFooter>
        <div className="control">
          <Link className="button is-primary" to={`${match.url}/edit`}>
            Edit Note
          </Link>
        </div>
        <div className="control">
          <button
            className="button is-danger"
            onClick={e => {
              // somehow delete the note
              const confirm = window.confirm(
                'Are you sure you want to delete?'
              );
              if (confirm) {
                dispatch({
                  type: 'delete',
                  payload: note.id,
                });
                history.push('/');
                toast.error('Note deleted');
              } else {
                toast.warn('Disaster averted');
              }
            }}
          >
            Delete
          </button>
        </div>
      </ButtonFooter>
    </>
  );
}

export default function Note({ match, history }) {
  const id = match.params.noteId;
  const notes = useContext(notesCtx);
  const index = getPosition(notes, id);

  console.log(notes[index]);
  const note = notes[index];

  return (
    <Switch>
      <Route
        path={match.url}
        exact
        render={() => {
          return <ViewNote note={note} match={match} history={history} />;
        }}
      />
      <Route
        path={`${match.url}/edit`}
        exact
        render={() => {
          return <EditNote note={note} history={history} />;
        }}
      />
      <Route component={Error404} />
    </Switch>
  );
}
