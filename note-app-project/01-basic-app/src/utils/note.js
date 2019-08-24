import { createContext, useReducer, useEffect } from 'react';
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

function getInitialNotes() {
  const fromLocalStorage = window.localStorage.getItem('note-app-notes');
  if (fromLocalStorage) {
    try {
      return JSON.parse(fromLocalStorage);
    } catch {
      return initialNotes;
    }
  }
  return initialNotes;
}

function setNotesToLocalStorage(notes) {
  window.localStorage.setItem('note-app-notes', JSON.stringify(notes));
}

/**
 * Reducer for managing notes.
 *
 * @param {Array} state Current notes.
 * @param {Object} action Dispatcher action.
 */
function notesReducer(state, action) {
  if (action.type === 'add') {
    return [action.payload, ...state];
  } else if (action.type === 'update') {
    const position = getPosition(state, action.payload.id);
    if (position === -1) {
      throw new Error('Invalid id passed to payload during notes update.');
    }
    return [
      ...state.slice(0, position),
      {
        id: action.payload.id,
        title: action.payload.title,
        note: action.payload.note,
      },
      ...state.slice(position + 1),
    ];
  } else if (action.type === 'delete') {
    const position = getPosition(state, action.payload.id);
    if (position === -1) {
      throw new Error('Invalid id passed to payload during notes update.');
    }
    return [...state.slice(0, position), ...state.slice(position + 1)];
  }
  throw new Error('Invalid type passed to action.');
}

export function useNotes() {
  const [notes, dispatch] = useReducer(notesReducer, null, getInitialNotes);
  useEffect(() => {
    setNotesToLocalStorage(notes);
  }, [notes]);
  return [notes, dispatch];
}

export const notesCtx = createContext();
export const noteDispatchCtx = createContext();
