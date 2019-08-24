import React, { useContext } from 'react';
import uuid4 from 'uuid/v4';

import NoteForm from '../../components/NoteForm';
import { noteDispatchCtx } from '../../utils/note';

export default function New({ history }) {
  const dispatch = useContext(noteDispatchCtx);

  return (
    <NoteForm
      initialNote=""
      initialTitle=""
      onSave={({ title, note }) => {
        const id = uuid4();
        dispatch({
          type: 'add',
          payload: {
            id,
            title,
            note,
          },
        });
        history.push(`note/${id}`);
      }}
    />
  );
}
