import React from 'react';
import { render, waitForElement, fireEvent, act } from '@testing-library/react';
import {
  TestAppProvider,
  getFirebaseAppAndAuth,
  listOfNotes,
  setNotesInApp,
} from '../../utils/testHelpers';

import Sidebar from '.';

describe('Sidebar Component', () => {
  test('shows message when user not logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth(null);
    const { getByTestId } = render(
      <TestAppProvider auth={auth} app={app}>
        <Sidebar />
      </TestAppProvider>
    );
    await waitForElement(() => getByTestId('sidebar-logout-msg'));
  });

  test('shows search and list of notes for logged in users', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    // set initial notes in sub collection, so that we can predict what
    // is going to show up in the sidebar
    await setNotesInApp(app, auth);
    await act(async () => {
      const { getByPlaceholderText, getByText } = render(
        <TestAppProvider auth={auth} app={app}>
          <Sidebar />
        </TestAppProvider>
      );
      await waitForElement(() => getByPlaceholderText('search notes...'));
      for (let i = 0; i < listOfNotes.length; i++) {
        const anchor = await waitForElement(() =>
          getByText(listOfNotes[i].title)
        );
        expect(anchor).toHaveAttribute('href', `/note/${listOfNotes[i].id}`);
      }
    });
  });
  // test('shows spinner till notes load', () => {
  // 	const [app, auth] =
  // })
});
