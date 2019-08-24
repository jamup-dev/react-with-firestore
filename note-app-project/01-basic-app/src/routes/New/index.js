import React, { useContext } from 'react';
import uuid4 from 'uuid/v4';
import { toast } from 'react-toastify';

import NoteForm from '../../components/NoteForm';
import { noteDispatchCtx } from '../../utils/note';

export default function New({ history }) {
  const dispatch = useContext(noteDispatchCtx);

  return (
    <NoteForm
      initialNote=""
      initialTitle=""
      onSave={({ title, note }) => {
        // create a new id
        const id = uuid4();
        // dispatch action to add to the list of notes
        dispatch({
          type: 'add',
          payload: {
            id,
            title,
            note,
          },
        });
        // navigate to the view page
        history.push(`note/${id}`);
        // show toast
        toast.success('✔️ Successfully created the note');
      }}
    />
  );
}
