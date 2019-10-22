import React, { useReducer } from 'react';
import uuid4 from 'uuid/v4';

import AppBox from './components/AppBox';
import AddTask from './components/AddTask';
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
      ...state,
      {
        id: uuid4(),
        task: action.payload,
        done: false,
      },
    ];
  }
  return state;
}

function App() {
  // Using useReducer hook create a state and a dispatcher function
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  // We will pass the tasks state and dispatch function with the help of
  // contexts
  return (
    <tasksContext.Provider value={tasks}>
      <dispatchContext.Provider value={dispatch}>
        <AppBox title="Task Application">
          <AddTask />
        </AppBox>
      </dispatchContext.Provider>
    </tasksContext.Provider>
  );
}

export default App;
