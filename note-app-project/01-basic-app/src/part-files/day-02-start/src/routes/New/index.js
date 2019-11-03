import React, { useContext } from 'react';

import NoteForm from '../../components/NoteForm';

export default function New() {
  return (
    <NoteForm
      initialNote=""
      initialTitle=""
      onSave={({ title, note }) => {
        console.log({ title, note });
      }}
    />
  );
}
