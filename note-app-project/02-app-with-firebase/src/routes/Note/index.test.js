import React from 'react';
import { Route } from 'react-router-dom';
import { render, act, fireEvent, cleanup } from '@testing-library/react';
import {
  TestAppProvider,
  getFirebaseAppAndAuth,
  setNotesInApp,
} from '../../utils/testHelpers';
import Note from '.';

describe('Note Route Component', () => {
  describe('when in view mode', () => {
    test('shows view note when in proper location', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      const notes = await setNotesInApp(app, auth);
      // we will work with the first note
      const currentNote = notes[0];

      // render at the particular URL
      const { findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/${currentNote.id}`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // assert we have the title and note on current page
      expect(await findByText(currentNote.title)).toBeInTheDocument();
      expect(await findByText(currentNote.note)).toBeInTheDocument();

      // we should also have the EDIT and DELETE button
      expect(await findByText('Edit Note')).toBeInTheDocument();
      expect(await findByText('Delete')).toBeInTheDocument();
    });

    test('shows error component, when not in proper location', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      await setNotesInApp(app, auth);

      // render at the particular URL
      const { findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/abcd-note-not-found`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // this should be found immediately
      expect(await findByText('Note not found')).toBeInTheDocument();
      // we need to cleanup because the useSetupNotesWithAuth would eventually
      // setNotes after the last line, and would cause TestAppProvider to
      // re-render
      cleanup();
    });

    test('clicking on the edit button takes to the edit page', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      const notes = await setNotesInApp(app, auth);
      // we will work with the first note
      const currentNote = notes[0];

      // render at the particular URL
      const { findByText, findByLabelText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/${currentNote.id}`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // we should also have the EDIT button
      const button = await findByText('Edit Note');
      expect(button).toBeInTheDocument();

      // click on the button
      act(() => {
        fireEvent.click(button);
      });

      // we should now have the form
      expect(await findByLabelText('Note')).toBeInTheDocument();
    });

    test('deletes the note when clicked on the delete button', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      const notes = await setNotesInApp(app, auth);
      // we will work with the first note
      const currentNote = notes[0];

      // mock window confirm because it is used in delete operation
      const originalConfirm = window.confirm;
      window.confirm = jest.fn(() => true);

      // render at the particular URL
      const { findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/${currentNote.id}`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // we should also have the Delete button
      const button = await findByText('Delete');
      expect(button).toBeInTheDocument();

      // click on the button
      act(() => {
        fireEvent.click(button);
      });

      // that should have called the window.confirm with a message
      expect(window.confirm).toHaveBeenCalledWith(
        'Are you sure you want to delete the note?'
      );

      // should have shown the toast message
      expect(await findByText('✔️ Deleted note')).toBeInTheDocument();

      // unmount the render, to avoid any cleanup issue
      cleanup();

      // make sure we don't have the currentNote in firestore
      const noteDoc = await app
        .firestore()
        .doc(`data/${auth.user.uid}/notes/${currentNote.id}`)
        .get();
      expect(noteDoc.exists).toBeFalsy();

      // restore original window.confirm
      window.confirm = originalConfirm;
    });

    test('does not delete note without user confirmation', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      const notes = await setNotesInApp(app, auth);
      // we will work with the first note
      const currentNote = notes[0];

      // mock window confirm because it is used in delete operation
      const originalConfirm = window.confirm;
      window.confirm = jest.fn(() => false);

      // render at the particular URL
      const { findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/${currentNote.id}`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // we should also have the Delete button
      const button = await findByText('Delete');
      expect(button).toBeInTheDocument();

      // click on the button
      act(() => {
        fireEvent.click(button);
      });

      // that should have called the window.confirm with a message
      expect(window.confirm).toHaveBeenCalledWith(
        'Are you sure you want to delete the note?'
      );

      // should have shown the toast message
      expect(await findByText('🔥 Disaster averted!')).toBeInTheDocument();

      // unmount the render, to avoid any cleanup issue
      cleanup();

      // make sure we still have the currentNote in firestore
      const noteDoc = await app
        .firestore()
        .doc(`data/${auth.user.uid}/notes/${currentNote.id}`)
        .get();
      expect(noteDoc.exists).toBeTruthy();

      // restore original window.confirm
      window.confirm = originalConfirm;
    });
  });

  describe('when in edit mode', () => {
    test('shows edit note when in proper location', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      const notes = await setNotesInApp(app, auth);
      // we will work with the first note
      const currentNote = notes[0];

      // render at the particular URL
      const { findByText, findByLabelText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/${currentNote.id}/edit`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // assert we have the title and note form input on current page
      const titleInput = await findByLabelText('Title');
      const noteInput = await findByLabelText('Note');
      expect(titleInput).toBeInTheDocument();
      expect(noteInput).toBeInTheDocument();

      // we should also have the Submit and Go Back button
      expect(await findByText('Submit')).toBeInTheDocument();
      expect(await findByText('Go Back')).toBeInTheDocument();
    });

    test('shows error component, when not in proper location', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      await setNotesInApp(app, auth);

      // render at the particular URL
      const { findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/abcd-note-not-found/edit`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      expect(await findByText('Note not found')).toBeInTheDocument();
    });

    test('Go Back button takes back to view', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      const notes = await setNotesInApp(app, auth);
      // we will work with the first note
      const currentNote = notes[0];

      // render at the particular URL
      const { findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/${currentNote.id}/edit`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // we expect the go back button
      const button = await findByText('Go Back');
      expect(button).toBeInTheDocument();

      // click on the button
      act(() => {
        fireEvent.click(button);
      });

      // we should now have the EDIT button
      expect(await findByText('Edit Note')).toBeInTheDocument();
    });

    test('submitting edit form updates the note', async () => {
      const [app, auth] = getFirebaseAppAndAuth();
      // add default notes so that our hook doesn't initialize it
      const notes = await setNotesInApp(app, auth);
      // we will work with the first note
      const currentNote = notes[0];

      // render at the particular URL
      const { findByTestId, findByText } = render(
        <TestAppProvider
          app={app}
          auth={auth}
          initialRoute={`/note/${currentNote.id}/edit`}
        >
          <Route path="/note/:noteId" component={Note} />
        </TestAppProvider>
      );

      // we should have the form
      const form = await findByTestId('noteform');

      // submit it
      act(() => {
        fireEvent.submit(form, {
          preventDefault: () => {},
          target: {
            'note-title': {
              value: 'An updated value from test',
            },
            'note-note': {
              value: 'Updated content value from test',
            },
          },
        });
      });

      // this should show a toast message
      expect(
        await findByText('✔️ Successfully updated note')
      ).toBeInTheDocument();

      // cleanup to avoid any further database sync changes
      cleanup();

      // make sure the thing got updated in firestore
      const noteDoc = await app
        .firestore()
        .doc(`data/${auth.user.uid}/notes/${currentNote.id}`)
        .get();
      const noteData = noteDoc.data();
      expect(noteDoc.exists).toBeTruthy();
      expect(noteData.title).toBe('An updated value from test');
      expect(noteData.note).toBe('Updated content value from test');
    });
  });
});
