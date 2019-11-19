import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../utils/auth';
import { useSetupNotesWithAuth } from './note';
import Provider from '../components/Provider';

export const testEmail = 'swashata-test@wpquark.com';
export const testPassword = '123456';

export function TestAppProvider({ children }) {
  const auth = useAuth();
  const [notes, dispatch, noteLoading] = useSetupNotesWithAuth(auth);

  return (
    <Provider
      auth={auth}
      notes={notes}
      dispatch={dispatch}
      noteLoading={noteLoading}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}
