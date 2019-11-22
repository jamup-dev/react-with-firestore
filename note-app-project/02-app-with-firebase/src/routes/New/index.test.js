import React from 'react';
import { render, act, fireEvent, wait, cleanup } from '@testing-library/react';
import {
  TestAppProvider,
  getFirebaseAppAndAuth,
} from '../../utils/testHelpers';
import New from '.';

function waaait(timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

describe('New Route Component', () => {
  test('shows the note form component', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const { getByLabelText } = render(
      <TestAppProvider app={app} auth={auth}>
        <New history={{ push: () => {} }} />
      </TestAppProvider>
    );

    expect(getByLabelText('Title')).toBeInTheDocument();
    expect(getByLabelText('Note')).toBeInTheDocument();
  });

  test('adds note to firestore when submit and navigates to new page', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const { findByText, getByTestId } = render(
      <TestAppProvider app={app} auth={auth}>
        <New history={{ push: () => {} }} />
      </TestAppProvider>
    );

    const form = getByTestId('noteform');
    expect(form).toBeInTheDocument();

    // submit the form
    act(() => {
      fireEvent.submit(form, {
        preventDefault: () => {},
        target: {
          'note-title': {
            value: 'A new note from test',
          },
          'note-note': {
            value: 'Note content from test',
          },
        },
      });
    });

    // this should show the toast
    expect(
      await findByText('✔️ Successfully created the note')
    ).toBeInTheDocument();
    // we manually call cleanup here because we don't want the New component
    // to rerender after this test, when we delete the data from firestore
    cleanup();

    // make sure we get the new note in firestore
    let found = false;
    let count = 0;
    const notesDocuments = await app
      .firestore()
      .collection(`data/${auth.user.uid}/notes`)
      .get();
    notesDocuments.forEach(n => {
      count++;
      const data = n.data();
      if (data.title === 'A new note from test') {
        found = true;
      }
    });
    expect(found).toBeTruthy();
    expect(count).toBe(3);
  });
});
