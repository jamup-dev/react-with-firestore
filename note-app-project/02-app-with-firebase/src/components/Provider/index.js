import React from 'react';

import { notesCtx, noteDispatchCtx, noteLoadingCtx } from '../../utils/note';
import { userContext } from '../../auth/user';

export default function Provider({
  auth,
  notes,
  dispatch,
  noteLoading,
  children,
}) {
  return (
    <userContext.Provider value={auth}>
      <notesCtx.Provider value={notes}>
        <noteDispatchCtx.Provider value={dispatch}>
          <noteLoadingCtx.Provider value={noteLoading}>
            {children}
          </noteLoadingCtx.Provider>
        </noteDispatchCtx.Provider>
      </notesCtx.Provider>
    </userContext.Provider>
  );
}
