import React from 'react';
import { render, waitForElement, act } from '@testing-library/react';
import firebase from '../../utils/firebase';
import {
  TestAppProvider,
  testPassword,
  testEmail,
} from '../../utils/testHelpers';
import Nav from './';

describe('Nav Component', () => {
  test('shows sign-in button when not logged in', async () => {
    const { getByText } = render(
      <TestAppProvider>
        <Nav />
      </TestAppProvider>
    );
    await waitForElement(() => getByText('Sign In'));
  });

  test('shows logout button when logged in', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <TestAppProvider>
          <Nav />
        </TestAppProvider>
      );
      await firebase.auth().signInWithEmailAndPassword(testEmail, testPassword);
      await waitForElement(() => getByTestId('logoutbutton'));
      // cleanup
      await firebase.auth().signOut();
    });
  });
});
