import React, { createContext, useContext } from 'react';

import firebase from './firebase';

export const userContext = createContext({ user: null, initializing: true });

export const useSession = () => {
  return useContext(userContext);
};

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });
  function onChange(user) {
    setState({ initializing: false, user });
  }

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return state;
};
