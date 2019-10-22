import React from 'react';

import { useTasks } from '../../utils/contexts';

import './style.scss';

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
        <pre>{JSON.stringify(filteredTasks, null, 2)}</pre>
      ) : (
        <div className="task-list__notice">
          No tasks yet{filter === 'all' ? '' : ' for this filter'}, kindly add
          some.
        </div>
      )}
    </div>
  );
}
