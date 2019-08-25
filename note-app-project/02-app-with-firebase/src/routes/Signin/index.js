import React from 'react';
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from '../../utils/firebase';
import { useSession } from '../../auth/user';
import Spinner from '../../components/Spinner';

export default function Signin({ history }) {
  const session = useSession();
  const uiConfig = {
    // Redirect signin flow.
    signInFlow: 'popup',
    // Provide a callbacks.signInSuccess function.
    callbacks: {
      signInSuccess() {
        history.push('/');
      },
    },
    // We will display Email, Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <div className="notes-app-signin">
      {session.initializing ? (
        <Spinner />
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}
