function App() {
  // very simple
  return React.createElement('h2', null, 'Hello World');
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(App, null, null),
    document.querySelector('#app')
  );
});
