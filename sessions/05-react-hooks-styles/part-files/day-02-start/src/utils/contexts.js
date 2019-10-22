import { createContext, useContext } from 'react';

export const tasksContext = createContext();
export const dispatchContext = createContext();

/**
 * Custom hook to get tasks at anyplace within the main App tree.
 *
 * Utilizes useContext and the tasksContext to get back tasks.
 */
export function useTasks() {
  return useContext(tasksContext);
}

/**
 * Custom hook to get dispatch at anyplace within the main App tree.
 *
 * Utilizes useContext and the dispatchContext to get back dispatch.
 */
export function useDispatch() {
  return useContext(dispatchContext);
}
