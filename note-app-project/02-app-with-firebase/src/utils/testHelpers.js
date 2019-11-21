import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as firebase from '@firebase/testing';
import { ToastContainer } from 'react-toastify';

import { useAuth } from '../utils/auth';
import { useSetupNotesWithAuth } from './note';
import Provider from '../components/Provider';

export const testEmail = 'notes-user@example.com';
export const testUid = 'notes-user';
export const projectId = 'firestore-emulator-notes-app';
export const testAuthObj = {
  uid: testUid,
  email: testEmail,
};

export function getFirebaseApp(authObj = testAuthObj) {
  return firebase.initializeTestApp({
    projectId,
    auth: authObj,
  });
}

export function getFirebaseAuth(authObj = testAuthObj) {
  return {
    initializing: false,
    user: authObj,
  };
}

export function getFirebaseAppAndAuth(authObj = testAuthObj) {
  return [getFirebaseApp(authObj), getFirebaseAuth(authObj)];
}

export function TestAppProvider({ children, auth, app }) {
  const [notes, dispatch, noteLoading] = useSetupNotesWithAuth(
    auth,
    app.firestore()
  );

  return (
    <Provider
      auth={auth}
      notes={notes}
      dispatch={dispatch}
      noteLoading={noteLoading}
    >
      <MemoryRouter>{children}</MemoryRouter>
      <ToastContainer />
    </Provider>
  );
}
