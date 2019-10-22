import React, { memo } from 'react';

import './style.scss';

const filters = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'done',
    label: 'Done',
  },
];

function FilterTask(props) {
  const { filter, setFilter } = props;
  return (
    <div className="filter-task">
      {filters.map(ft => (
        <button
          key={ft.value}
          onClick={e => {
            e.preventDefault();
            setFilter(ft.value);
          }}
          className={`filter-task__button ${
            ft.value === filter ? 'filter-task__button--active' : ''
          }`}
        >
          {ft.label}
        </button>
      ))}
    </div>
  );
}

export default memo(FilterTask);
