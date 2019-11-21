import React, { createContext, useContext } from 'react';

export const userContext = createContext({ user: null, initializing: true });

export const useSession = () => {
  return useContext(userContext);
};

export const useAuth = firebaseAuth => {
  // lazily init state when called the first time in a component
  const [state, setState] = React.useState(() => {
    // right now, currentUser might be null, because firebase needs some time
    // to figure out which user is logged in
    const user = firebaseAuth.currentUser;
    // init the session state
    return { initializing: !user, user };
  });

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      setState({ initializing: false, user });
    });
    // unsubscribe to the listener when unmounting
    return unsubscribe;
  }, [firebaseAuth]);

  return state;
};
