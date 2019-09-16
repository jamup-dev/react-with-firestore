import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h2>Hello World</h2>;
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
