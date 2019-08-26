import { createContext, useEffect, useState } from 'react';
import uuid4 from 'uuid/v4';
import firebase from './firebase';

const db = firebase.firestore();

const initialNotes = [
  {
    id: uuid4(),
    title: 'Sample Note',
    note: `## Est relatu rigore facitis montibus bibulis

Primos committere placet ille unda scires vicem pariturae ex rapiare quater
violabere fulva patruelibus, carmen florentis culpa. Maenaliosque quoque sulcis
curalium in palude flumineis texere, in inicit frondes. Tollite equam, infuso in
erat iugulo turba. Dat adsere non, in cum longeque ergo.

1. Est fatebor unica
2. Non est umerique vise una
3. Non nomen in quem umbra
4. Pavonibus capiebat tormentis pugnare et faciem
5. Portis Tarentum viro
6. Respicit puerpera quicquid divesque defendere in foret`,
  },
  {
    id: uuid4(),
    title: 'Another Note',
    note: `## Vidisti tamen

    Inpositum habet deam, aeacides marisque aures, suco missus, tum qui seque. Unum
    cui quas possis est orant inpulerat ensem, tactusque vibrata tormento linguas.
    Digna exanimi suis perdere, tandem constantia abest tulitquemuneris canentis;
    Gorgone pedes amens terrent. Nec iungere **voce**: dare **per** lanianda
    progeniem vocis Oresteae incumbensque grata et Dolona Saturnia bimembres fuit
    est viro. Postera tumulus caloris silices Damasicthona semel et mergit valetque
    litora Nasamoniaci moras latebris, terga dolores amores castique.`,
  },
];

export const getPosition = (haystack, id) => {
  const position = haystack.findIndex(item => {
    return item.id === id;
  });
  return position;
};

export function useNotes(auth) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(() => {
    // the initial state depends on whether auth is there
    // we would be loading, only when auth has been initialized and there's
    // a user to subscriber to
    if (!auth.user && !auth.initializing) {
      // if we have user, then the useEffect will be loading
      return true;
    }
    // otherwise it will not
    return false;
  });

  // set sync to notes during mount or auth change
  useEffect(() => {
    // don't do any effect if auth hasn't found a user
    if (!auth.user) {
      // but do reset the notes to empty
      setNotes([]);
      return;
    }

    // a new auth has landed, so we need to load it via onSnapshot
    setLoading(true);

    // get the docRef
    const docRef = db.doc(`notes/${auth.user.uid}`);

    // add event listener on change
    const unsubscribe = docRef.onSnapshot(doc => {
      // if data exists on the firestore, then simply update our local-state
      if (doc && doc.exists) {
        const data = doc.data();
        setNotes(data.notes);
      } else {
        // no data exists on our server, so add the default one
        docRef
          .set({
            notes: initialNotes,
          })
          .then(() => {
            console.log('Initial save successful');
          })
          .catch(error => {
            console.log('Error', error);
          });
      }
      // in any case, we have set the notes, so we are no longer loading
      // if it was already false, then react will not re-render anyway
      setLoading(false);
    });
    // return cleanup function
    // this will be called when auth changes
    return () => {
      setLoading(false);
      unsubscribe();
    };
  }, [auth]);

  // now create our custom dispatcher function to do the operation on firestore
  // instead of doing this on our state.
  // when we do the operation on firestore, it will update our state thanks to
  // the useEffect we've written before.
  const dispatch = action => {
    // again don't do anything if isn't authenticated
    if (!auth.user) {
      return;
    }

    // calculate the new notes based on action
    let newNotes;
    if (action.type === 'add') {
      newNotes = [action.payload, ...notes];
    } else if (action.type === 'update') {
      const position = getPosition(notes, action.payload.id);
      if (position === -1) {
        throw new Error('Invalid id passed to payload during notes update.');
      }
      newNotes = [
        ...notes.slice(0, position),
        {
          id: action.payload.id,
          title: action.payload.title,
          note: action.payload.note,
        },
        ...notes.slice(position + 1),
      ];
    } else if (action.type === 'delete') {
      const position = getPosition(notes, action.payload.id);
      if (position === -1) {
        throw new Error('Invalid id passed to payload during notes delete.');
      }
      newNotes = [...notes.slice(0, position), ...notes.slice(position + 1)];
    }

    // update to firestore
    const docRef = db.doc(`notes/${auth.user.uid}`);
    docRef
      .set({
        notes: newNotes,
      })
      .then(() => {
        console.log('Successfully saved');
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  return [notes, dispatch, loading];
}

export const notesCtx = createContext();
export const noteDispatchCtx = createContext();
