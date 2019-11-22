import React from 'react';
import { render } from '@testing-library/react';
import {
  TestAppProvider,
  getFirebaseAppAndAuth,
} from '../../utils/testHelpers';
import Home from '.';

describe('Home Route', () => {
  test('shows sign in button if user not logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth(null);
    const { findByText } = render(
      <TestAppProvider auth={auth} app={app}>
        <Home />
      </TestAppProvider>
    );

    const button = await findByText('Sign in');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('href')).toBe('/signin');
  });

  test('shows new note button if user is logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const { findByText } = render(
      <TestAppProvider auth={auth} app={app}>
        <Home />
      </TestAppProvider>
    );

    const button = await findByText('New Note');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('href')).toBe('/new');
  });
});
