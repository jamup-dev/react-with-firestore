import React, { useState, useCallback } from 'react';

import { ReactComponent as AddIcon } from '../../icons/Add.svg';
import { useDispatch } from '../../utils/contexts';

import './style.scss';

export default function AddTask() {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const addTask = useCallback(
    e => {
      // stop submitting the form
      e.preventDefault();
      // add a new task by using dispatch
      dispatch({ type: 'ADD_TASK', payload: task });
      // reset text of input
      setTask('');
    },
    [task, dispatch]
  );

  return (
    <div className="add-task">
      <form onSubmit={addTask}>
        <input
          className="add-task__input"
          type="text"
          value={task}
          onChange={e => {
            setTask(e.target.value);
          }}
          placeholder="add new task..."
        />
        <button className="add-task__button" type="submit">
          <AddIcon />
        </button>
      </form>
    </div>
  );
}
