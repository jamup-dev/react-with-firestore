import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  TestAppProvider,
  getFirebaseAppAndAuth,
} from '../../utils/testHelpers';
import Nav from '.';

describe('Nav Component', () => {
  test('shows sign-in button when not logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth(null);
    const { findByText } = render(
      <TestAppProvider app={app} auth={auth}>
        <Nav firebaseAuth={{ signOut: () => {} }} />
      </TestAppProvider>
    );
    expect(await findByText('Sign In')).toBeInTheDocument();
  });

  test('shows logout button when logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const { findByTestId } = render(
      <TestAppProvider app={app} auth={auth}>
        <Nav firebaseAuth={{ signOut: () => {} }} />
      </TestAppProvider>
    );
    expect(await findByTestId('logoutbutton')).toBeInTheDocument();
  });

  test('calls firebase signout function when clicked on logout button', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const authMock = { signOut: jest.fn() };

    const { findByTestId } = render(
      <TestAppProvider app={app} auth={auth}>
        <Nav firebaseAuth={authMock} />
      </TestAppProvider>
    );

    const button = await findByTestId('logoutbutton');

    fireEvent.click(button);

    expect(authMock.signOut).toBeCalledTimes(1);
  });
});
