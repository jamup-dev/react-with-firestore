import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import {
  TestAppProvider,
  getFirebaseAppAndAuth,
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
    expect(getByTestId('sidebar-logout-msg')).toBeInTheDocument();
    // we don't have to wait for anything here
    // because the useEffect of useSetupNotesWithAuth won't be called
    // with null auth
  });

  test('shows search and list of notes when there are notes', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    // set initial notes in sub collection, so that we can predict what
    // is going to show up in the sidebar
    // do it in an act, because it would cause a state change with `useNotes`
    // in the TestAppProvider->Sidebar
    const listOfNotes = await setNotesInApp(app, auth);

    // render the app
    const { getByTestId, findByPlaceholderText, findByText } = render(
      <TestAppProvider auth={auth} app={app}>
        <Sidebar />
      </TestAppProvider>
    );

    // it should show the spinner right away
    expect(getByTestId('spinner')).toBeInTheDocument();

    // assert the search bar
    // we have to wait for it, because when notes is loading
    // it shows a spinner
    expect(await findByPlaceholderText('search notes...')).toBeInTheDocument();

    // assert every anchor links in the list
    for (let i = 0; i < listOfNotes.length; i++) {
      // we have to wait for these because it is set on next tick
      // i.e, when notes are set from firebase and updated onSnapshot inside
      // the hook
      const anchor = await findByText(listOfNotes[i].title);
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', `/note/${listOfNotes[i].id}`);
    }
  });

  test('shows message when there are no notes', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    // set initial notes to empty, so that sidebar doesn't show anything
    await setNotesInApp(app, auth, []);

    const { findByTestId } = render(
      <TestAppProvider auth={auth} app={app}>
        <Sidebar />
      </TestAppProvider>
    );

    expect(await findByTestId('no-notes')).toBeInTheDocument();
  });

  test('search filters proper notes', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    // set initial notes to non empty
    await setNotesInApp(app, auth);

    const { queryByText, findByText, findByPlaceholderText } = render(
      <TestAppProvider auth={auth} app={app}>
        <Sidebar />
      </TestAppProvider>
    );

    const searchInput = await findByPlaceholderText('search notes...');

    // wait for default list to appear
    expect(await findByText('Note Title One')).toBeInTheDocument();
    expect(await findByText('Note Title Two')).toBeInTheDocument();

    // fire input event. Since it will cause state change in the Sidebar
    // component, we wrap it inside act
    act(() => {
      // the string `Title on` should match only `Note Title One`
      fireEvent.change(searchInput, { target: { value: 'Title on' } });
    });

    // Note title one should be in document
    expect(await findByText('Note Title One')).toBeInTheDocument();
    // Note title two should not be in document anymore
    expect(queryByText('Note Title Two')).not.toBeInTheDocument();

    // Now further change the search
    act(() => {
      fireEvent.change(searchInput, {
        target: { value: 'i am surely not present' },
      });
    });

    expect(queryByText('Note Title One')).not.toBeInTheDocument();
    expect(queryByText('Note Title Two')).not.toBeInTheDocument();
  });

  test('toggle sidebar works', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    // set initial notes to non empty
    await setNotesInApp(app, auth);

    const { findByTestId, findByText } = render(
      <TestAppProvider auth={auth} app={app}>
        <Sidebar />
      </TestAppProvider>
    );

    // toggle button should not be present from the beginning
    // rather only when the notesLoading resolves
    const toggleButton = await findByTestId('sidebar-toggle');
    expect(toggleButton).toBeInTheDocument();

    // also the list of notes should be resolved
    // we need to wait till it anyway because then our useEffect from hook
    // would run
    expect(await findByText('Note Title One')).toBeInTheDocument();
    expect(await findByText('Note Title Two')).toBeInTheDocument();

    // Now get the sidebar aside
    const sideBarAside = await findByTestId('sidebar-aside');
    expect(sideBarAside).toBeInTheDocument();
    expect(sideBarAside.classList).not.toContain('menu-is-visible');

    // now act by clicking the toggleButton
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(sideBarAside.classList).toContain('menu-is-visible');
  });
});
