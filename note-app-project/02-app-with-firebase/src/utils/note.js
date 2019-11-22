import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import uuid4 from 'uuid/v4';

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

export function useSetupNotesWithAuth(auth, db) {
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
  // we also have to account for any firebase error that might happen
  const [error, setError] = useState(false);

  // we need a isMounted ref to not call setState from async function
  // when the component is no longer mounted
  const isMounted = useRef();
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // set sync to notes during mount or auth change
  useEffect(() => {
    // don't do any effect if auth hasn't found a user
    if (!auth.user) {
      // but do reset the notes to empty
      setNotes([]);
      // and loading to false
      setLoading(false);
      // and error to false
      setError(false);
      return;
    }

    // a new auth has landed, so we need to load it via onSnapshot
    // first, set notes loading to true
    setLoading(true);

    // user document has an initialized field to check whether this one
    // had default notes or not
    const userDataDoc = db.doc(`data/${auth.user.uid}`);
    // inside the document we have another sub-collection for all the notes
    const notesCollection = db.collection(`data/${auth.user.uid}/notes`);
    // get the userData and check for initialized
    userDataDoc
      .get()
      .then(uDataSnapshot => {
        // a flag to determine whether uData has been initialized
        let dataInitialized = false;
        // for newly created users, uDataSnapshot could not exist
        if (uDataSnapshot && uDataSnapshot.exists) {
          const uData = uDataSnapshot.data();
          if (uData && uData.initialized) {
            dataInitialized = true;
          }
        }

        // if user data has not been initialized, then create default sets of
        // notes from our array of initialNotes and return a new promise to
        // the chain
        if (!dataInitialized) {
          const operations = [];
          initialNotes.forEach(n => {
            // push our promise
            operations.push(
              notesCollection
                .doc(n.id)
                .set({
                  title: n.title,
                  note: n.note,
                })
                .catch(e => {
                  if (isMounted.current) {
                    setError(e);
                  }
                })
            );
          });
          return Promise.all(operations);
        }

        // otherwise, there is no operation to perform, so return false
        // this will be picked by next then chain
        return false;
      })
      // the next then chain is called when Promise.all is resolved from last
      // chain (if needed) or immediately if we returned false when initialized
      // was set to true.
      .then(hasInitialized => {
        // if it has been initialized in the last step, then set the flag on
        // database as well
        if (hasInitialized) {
          // no need to set notes here, since it will be done on snapshot update anyway
          // but we still need to update the userDataDoc
          // So return this promise which would be picked by the finally chain
          return userDataDoc.set({
            initialized: true,
          });
        }
        return false;
      })
      .catch(e => {
        if (isMounted.current) {
          setError(e);
        }
      })
      .finally(() => {
        // we are not loading anymore
        if (isMounted.current) {
          setLoading(false);
        }
      });

    // now add a snapshot event on the notes collection and update our state
    // accordingly
    const unsubscribe = notesCollection.onSnapshot(
      // callback when snapshot updates
      notes => {
        const notesInDb = [];
        notes.forEach(n => {
          const noteData = n.data();
          notesInDb.push({
            id: n.id,
            title: noteData.title,
            note: noteData.note,
          });
        });
        setLoading(false);
        // loading is done too
        setNotes(notesInDb);
      },
      // callback for errors
      error => {
        setError(error);
      }
    );

    // return cleanup function, it will be called when auth changes
    return () => {
      if (isMounted.current) {
        setLoading(false);
      }
      unsubscribe();
    };
  }, [auth, db]);

  // now create our custom dispatcher function to do the operation on firestore
  // instead of doing this on our state.
  // when we do the operation on firestore, it will update our state thanks to
  // the useEffect we've written before.
  // Instead of creating the same function on every render, we use
  // useCallback which would return the same function, depending on auth
  const dispatch = useCallback(
    action => {
      // again don't do anything if isn't authenticated
      if (!auth.user) {
        return;
      }

      // first get our notes collection
      const notesCollection = db.collection(`data/${auth.user.uid}/notes`);
      // set loading to true, because we expect async operations here
      setLoading(true);
      // now depending on action, do the work
      if (action.type === 'add') {
        // add a new note to the notes collection
        const note = action.payload;
        notesCollection
          .doc(note.id)
          .set({
            title: note.title,
            note: note.note,
          })
          .catch(e => {
            if (isMounted.current) {
              setError(e);
            }
          });
      } else if (action.type === 'update') {
        // update a note to the collection
        const note = action.payload;
        notesCollection
          .doc(note.id)
          .set({
            title: note.title,
            note: note.note,
          })
          .catch(e => {
            if (isMounted.current) {
              setError(e);
            }
          });
      } else if (action.type === 'delete') {
        notesCollection
          .doc(action.payload.id)
          .delete()
          .catch(e => {
            if (isMounted.current) {
              setError(e);
            }
          });
      } else {
        // no async operation done, so no need to set loading
        setLoading(false);
      }
    },
    [auth, db]
  );

  return [notes, dispatch, loading, error];
}

export const notesCtx = createContext();
export const noteDispatchCtx = createContext();
export const noteLoadingCtx = createContext();

export function useNotes() {
  return useContext(notesCtx);
}

export function useDispatch() {
  return useContext(noteDispatchCtx);
}

export function useNoteLoading() {
  return useContext(noteLoadingCtx);
}
