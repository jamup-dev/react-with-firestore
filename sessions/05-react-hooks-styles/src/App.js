import React, { useReducer, useState, useEffect } from 'react';
import uuid4 from 'uuid/v4';

import AppBox from './components/AppBox';
import AddTask from './components/AddTask';
import FilterTask from './components/FilterTask';
import TaskList from './components/TaskList';
import { dispatchContext, tasksContext } from './utils/contexts';

const initialTasks = [
  {
    id: uuid4(),
    task: 'Shop for grocries',
    done: false,
  },
  {
    id: uuid4(),
    task: 'Buy medicines',
    done: false,
  },
  {
    id: uuid4(),
    task: 'Buy dog food',
    done: false,
  },
  {
    id: uuid4(),
    task: 'Feed the dogs',
    done: false,
  },
];

function taskReducer(state, action) {
  if (action.type === 'ADD_TASK') {
    return [
      // spread and create a shallow copy
      ...state,
      // add new task at the end of the list
      {
        id: uuid4(),
        task: action.payload,
        done: false,
      },
    ];
  }
  if (action.type === 'TOGGLE_DONE') {
    // create shallow copy of state
    const newState = [...state];
    // figure out the index
    const index = newState.findIndex(st => st.id === action.payload);
    // now if index is found, then
    if (index !== -1) {
      // delete one item at the index, and insert the same one
      // with modified done
      newState.splice(index, 1, {
        ...newState[index],
        done: !newState[index].done,
      });
    }
    // return the modified state
    return newState;
  }
  if (action.type === 'DELETE_TASK') {
    // create shallow copy of state
    const newState = [...state];
    // figure out the index
    const index = newState.findIndex(st => st.id === action.payload);
    // now if index is found, then
    if (index !== -1) {
      // delete one item at the index
      newState.splice(index, 1);
    }
    // return the modified state
    return newState;
  }
  return state;
}

function App() {
  // Using useReducer hook create a state and a dispatcher function
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  // useState hook to create a current filter
  const [filter, setFilter] = useState('all');

  // Add a useEffect to dynamically change the page title
  useEffect(() => {
    const tasksToDo = tasks.reduce((acc, task) => {
      if (task.done) {
        return acc;
      }
      return acc + 1;
    }, 0);
    if (tasksToDo > 0) {
      document.title = `(${tasksToDo}) Task Application`;
    } else {
      document.title = `Task Application`;
    }
  }, [tasks]);

  // We will pass the tasks state and dispatch function with the help of
  // contexts
  return (
    <tasksContext.Provider value={tasks}>
      <dispatchContext.Provider value={dispatch}>
        <AppBox title="Task Application">
          <AddTask />
          <FilterTask filter={filter} setFilter={setFilter} />
          <TaskList filter={filter} />
        </AppBox>
      </dispatchContext.Provider>
    </tasksContext.Provider>
  );
}

export default App;
