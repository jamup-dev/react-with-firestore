import React from 'react';
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import firebase from '../../utils/firebase';
import { AppProvider, testPassword, testEmail } from '../../utils/testHelpers';
import Nav from './';

describe('navigation bar', () => {
  test('shows sign-in button when not logged in', async () => {
    const { getByText } = render(
      <AppProvider>
        <Nav />
      </AppProvider>
    );
    await waitForElement(() => getByText('Sign In'));
  });

  test('shows logout button when logged in', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <AppProvider>
          <Nav />
        </AppProvider>
      );
      await firebase.auth().signInWithEmailAndPassword(testEmail, testPassword);
      await waitForElement(() => getByTestId('logoutbutton'));
      // cleanup
      await firebase.auth().signOut();
    });
  });
});
