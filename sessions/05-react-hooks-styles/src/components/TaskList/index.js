import React, { memo } from 'react';

import { useTasks, useDispatch } from '../../utils/contexts';
import { ReactComponent as CheckIcon } from '../../icons/Check.svg';
import { ReactComponent as CloseIcon } from '../../icons/Close.svg';

import './style.scss';

function Task(props) {
  const dispatch = useDispatch();

  const { id, task, done } = props;
  return (
    <div className="task-list__item">
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({ type: 'TOGGLE_DONE', payload: id });
        }}
        className={`task-list__donebutton ${
          done ? 'task-list__donebutton--done' : ''
        }`}
      >
        <CheckIcon />
      </button>
      <div className="task-list__label">{task}</div>
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({ type: 'DELETE_TASK', payload: id });
        }}
        className="task-list__deletebutton"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

const MemoizedTask = memo(Task);

export default function TaskList(props) {
  const tasks = useTasks();
  const { filter } = props;

  let filteredTasks = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter(tk => tk.done !== true);
  } else if (filter === 'done') {
    filteredTasks = tasks.filter(tk => tk.done === true);
  }

  return (
    <div className="task-list">
      {filteredTasks.length ? (
        filteredTasks.map(ft => <MemoizedTask key={ft.id} {...ft} />)
      ) : (
        <div className="task-list__notice">
          No tasks yet{filter === 'all' ? '' : ' for this filter'}, kindly add
          some.
        </div>
      )}
    </div>
  );
}
