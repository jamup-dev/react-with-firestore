import React from 'react';
import { render, waitForElement, act, fireEvent } from '@testing-library/react';
import {
  TestAppProvider,
  testAuthObj,
  getFirebaseApp,
  getFirebaseAuth,
  getFirebaseAppAndAuth,
} from '../../utils/testHelpers';
import Nav from './';

describe('Nav Component', () => {
  test('shows sign-in button when not logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth(null);
    const { getByText } = render(
      <TestAppProvider app={app} auth={auth}>
        <Nav firebaseAuth={{ signOut: () => {} }} />
      </TestAppProvider>
    );
    await waitForElement(() => getByText('Sign In'));
  });

  test('shows logout button when logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const { getByTestId } = render(
      <TestAppProvider app={app} auth={auth}>
        <Nav firebaseAuth={{ signOut: () => {} }} />
      </TestAppProvider>
    );
    await waitForElement(() => getByTestId('logoutbutton'));
  });

  test('calls firebase signout function when clicked on logout button', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const authMock = { signOut: jest.fn() };

    const { getByTestId } = render(
      <TestAppProvider app={app} auth={auth}>
        <Nav firebaseAuth={authMock} />
      </TestAppProvider>
    );

    const button = await waitForElement(() => getByTestId('logoutbutton'));

    fireEvent.click(button, {
      preventDefault: () => {},
    });

    expect(authMock.signOut).toBeCalledTimes(1);
  });
});
