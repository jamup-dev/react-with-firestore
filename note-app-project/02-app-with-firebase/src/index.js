import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { firebaseAuth, firebaseDb } from './utils/firebase';
// We pass firebase auth and db as props to App
// so that we can mock them in tests.
// This is called dependency injection

ReactDOM.render(
  <App firebaseAuth={firebaseAuth} firebaseDb={firebaseDb} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
