import React, { useContext } from 'react';
import Markdown from 'markdown-to-jsx';

import Error404 from '../../components/404';
import { notesCtx, getPosition } from '../../utils/note';

export default function View({ match }) {
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
  const note = notes[position];
  return (
    <>
      <h2 className="title is-2">{note.title}</h2>
      <div className="content">
        <Markdown>{note.note}</Markdown>
      </div>
    </>
  );
}
