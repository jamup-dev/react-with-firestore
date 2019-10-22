import React from 'react';

import './style.scss';

export default function AppBox(props) {
  const { title, children } = props;
  return (
    <div className="todo-app-box">
      <h2 className="todo-app-box__title">{title}</h2>
      {children}
    </div>
  );
}
