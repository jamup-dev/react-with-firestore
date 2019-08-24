import React, { useContext } from 'react';
import Markdown from 'markdown-to-jsx';
import { Switch, Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Error404 from '../../components/404';
import NoteForm from '../../components/NoteForm';
import ButtonFooter from '../../components/ButtonFooter';
import { notesCtx, getPosition, noteDispatchCtx } from '../../utils/note';

function ViewNote({ noteObj, match, history }) {
  const dispatch = useContext(noteDispatchCtx);

  const deleteHandler = e => {
    // prevent default action
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete the note?')) {
      // redirect to home
      history.push('/');
      // dispatch delete action
      dispatch({
        type: 'delete',
        payload: {
          id: noteObj.id,
        },
      });
      // show toast message
      toast.warn('✔️ Deleted note');
    } else {
      // something funny
      toast.info('🔥 Disaster averted!');
    }
  };

  return (
    <>
      <h2 className="title is-2">{noteObj.title}</h2>
      <div className="content" style={{ paddingBottom: '70px' }}>
        <Markdown>{noteObj.note}</Markdown>
      </div>
      <ButtonFooter>
        <div className="control">
          <Link className="button is-primary" to={`${match.url}/edit`}>
            Edit Note
          </Link>
        </div>
        <div className="control">
          <button className="button is-danger" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </ButtonFooter>
    </>
  );
}

function EditNote({ noteObj }) {
  const dispatch = useContext(noteDispatchCtx);
  return (
    <NoteForm
      initialNote={noteObj.note}
      initialTitle={noteObj.title}
      cancelLink={`/note/${noteObj.id}`}
      cancelLabel="Go Back"
      onSave={({ title, note }) => {
        // dispatch action to update
        dispatch({
          type: 'update',
          payload: {
            id: noteObj.id,
            title,
            note,
          },
        });
        // show message using toast
        toast.success('✔️ Successfully updated note');
      }}
    />
  );
}

export default function Note({ match, history }) {
  const notes = useContext(notesCtx);
  const position = getPosition(notes, match.params.noteId);
  if (position === -1) {
    return (
      <Error404
        title="Note not found"
        description="The note you are trying to access can not be found."
      />
    );
  }
  const noteObj = notes[position];
  return (
    <Switch>
      <Route
        path={`${match.url}`}
        exact
        render={() => (
          <ViewNote match={match} history={history} noteObj={noteObj} />
        )}
      />
      <Route
        path={`${match.url}/edit`}
        exact
        render={() => <EditNote noteObj={noteObj} />}
      />
      <Route component={Error404} />
    </Switch>
  );
}
