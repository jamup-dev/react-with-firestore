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

export function notesReducer(state, action) {
  if (action.type === 'add') {
    const newState = [...state, action.payload];
    return newState;
  } else if (action.type === 'delete') {
    const index = getPosition(state, action.payload);
    if (index === -1) {
      throw new Error('Invalid id passed');
    }
    const newState = [...state.slice(0, index), ...state.slice(index + 1)];
    return newState;
  } else if (action.type === 'update') {
    // THIS IS WRONG
    const index = getPosition(state, action.payload.id);
    if (index === -1) {
      throw new Error('Invalid id passed');
    }

    const newState = [...state];

    // const newState = [
    //   ...state.slice(0, index),
    //   {...action.payload},
    //   ...state.slice(index + 1),
    // ];

    newState.splice(index, 1, action.payload);

    // newState[index] = {...action.payload};
    return newState;
  }

  throw new Error('Invalid type passed to action');
}

export function getInitialNotes() {
  try {
    const fromLocalStorage = window.localStorage.getItem('notes-app-notes');
    if (!fromLocalStorage) {
      return initialNotes;
    }
    return JSON.parse(fromLocalStorage);
  } catch (e) {
    return initialNotes;
  }
}

export const notesCtx = createContext();
export const noteDispatchCtx = createContext();

export const getPosition = (haystack, id) =>
  haystack.findIndex(item => item.id === id);

export function useNotes() {
  const [notes, dispatch] = useReducer(notesReducer, null, getInitialNotes);

  useEffect(() => {
    window.localStorage.setItem('notes-app-notes', JSON.stringify(notes));
  }, [notes]);

  return [notes, dispatch];
}
