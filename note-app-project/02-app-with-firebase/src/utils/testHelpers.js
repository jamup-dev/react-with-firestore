import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as firebase from '@firebase/testing';
import { ToastContainer } from 'react-toastify';

import { useSetupNotesWithAuth } from './note';
import Provider from '../components/Provider';

export const testEmail = 'notes-user@example.com';
export const testUid = 'notes-user';
export const projectId = 'firestore-emulator-notes-app';
export const testAuthObj = {
  uid: testUid,
  email: testEmail,
};

// This function gives firebaseApp instance which talks to
// the emulator, instead of live Google Firebase Server
// The API is very similar to firebase.initializeApp
// CAUTION: Don't call .auth(), else it will give an error
// mock the auth
export function getFirebaseApp(authObj = testAuthObj) {
  return firebase.initializeTestApp({
    projectId,
    auth: authObj,
  });
}

// This function gives an output of `useAuth` hook
// useAuth basically has two fields
// 1. initializing: whether or not user has been initialized from firebase
// 2. user: currently logged in user
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
  // we can not call app.auth() right now, because
  // it will throw an error from @firebase/testing
  // hence we can not call useAuth hook in this (unlike App)
  // so we get the output of useAuth directly from props
  // and whenever we test, we use the getFirebaseAuth function
  // to create one `auth` object.
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
