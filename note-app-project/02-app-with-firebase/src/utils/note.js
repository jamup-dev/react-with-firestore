import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
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

export function useSetupNotesWithAuth(auth) {
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
    // inside the document we have another collection for all the notes
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

        // if user has already been initialized, then just get the notes from
        // collection and populate our data
        if (dataInitialized) {
          // just set loading to false, because our snapshot would update
          // notes anyway
          setLoading(false);
        } else {
          // create default set of notes in the notes collection
          const operations = [];
          initialNotes.forEach(n => {
            // push our promise
            operations.push(
              notesCollection.doc(n.id).set({
                title: n.title,
                note: n.note,
              })
            );
          });
          Promise.all(operations)
            .then(() => {
              // no need to set notes here, since it will be done on snapshot update anyway
              // but we still need to update the userDataDoc
              userDataDoc
                .set({
                  initialized: true,
                })
                .then(() => {
                  setLoading(false);
                })
                .catch(e => {
                  setLoading(false);
                  setError(e);
                });
            })
            .catch(e => {
              setLoading(false);
              setError(e);
            });
        }
      })
      .catch(e => {
        setLoading(false);
        setError(e);
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
      setLoading(false);
      unsubscribe();
    };
  }, [auth]);

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
            setError(e);
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
            setError(e);
          });
      } else if (action.type === 'delete') {
        notesCollection
          .doc(action.payload.id)
          .delete()
          .catch(e => {
            setError(e);
          });
      } else {
        // no async operation done, so no need to set loading
        setLoading(false);
      }
    },
    [auth]
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
