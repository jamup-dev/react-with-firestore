import { useState, useEffect, createContext, useContext } from 'react';
import firebase from './firebase';

export const authCtx = createContext();

export function useSession() {
  return useContext(authCtx);
}

export function useAuth() {
  const [user, setUser] = useState(() => {
    const u = firebase.auth().currentUser;
    return { initializing: true, user: u };
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser({
        initializing: false,
        user,
      });
    });

    return unsubscribe;
  }, []);

  return user;
}
