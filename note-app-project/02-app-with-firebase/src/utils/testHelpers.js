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

export const listOfNotes = [
  {
    id: 'note-id-1',
    title: 'Note Title One',
    note: 'Note Content One',
  },
  {
    id: 'note-id-2',
    title: 'Note Title Two',
    note: 'Note Content Two',
  },
];

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

/**
 * Set notes in an app.
 *
 * Must call it before `useSetupNotesWithAuth`.
 *
 * @param  {firebase.app.App} app App
 */
export async function setNotesInApp(app, auth, notes = listOfNotes) {
  const db = app.firestore();
  const docRef = db.doc(`data/${auth.user.uid}`);
  const collectionRef = db.collection(`data/${auth.user.uid}/notes`);
  // set initialized to true in doc
  await docRef.set({
    initialized: true,
  });
  // put notes in subcollection
  const operations = [];
  notes.forEach(note => {
    operations.push(
      collectionRef.doc(note.id).set({
        title: note.title,
        note: note.note,
      })
    );
  });
  await Promise.all[operations];

  return notes;
}

/**
 *
 * @param {object} authObj Auth object.
 */
export function getFirebaseAppAndAuth(authObj = testAuthObj) {
  return [getFirebaseApp(authObj), getFirebaseAuth(authObj)];
}

export function TestAppProvider({ children, auth, app, initialRoute = '/' }) {
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
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      <ToastContainer />
    </Provider>
  );
}
