import React, { useContext } from 'react';
import Markdown from 'markdown-to-jsx';
import { Switch, Route, Link } from 'react-router-dom';

import Error404 from '../../components/404';
import ButtonFooter from '../../components/ButtonFooter';
import { notesCtx, getPosition } from '../../utils/note';

function ViewNote({ noteObj, match, history }) {
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
          <button
            className="button is-danger"
            onClick={() => {
              console.log('we are supposed to delete it');
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
      <Route component={Error404} />
    </Switch>
  );
}
