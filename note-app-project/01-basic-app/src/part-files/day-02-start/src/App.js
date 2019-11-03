import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Error404 from './components/404';

import Home from './routes/Home';
import New from './routes/New';

import './style.scss';

export default function App() {
  return (
    <Router>
      <header>
        <Nav />
      </header>
      <main className="notes-app section">
        <Sidebar links={[]} />
        <div className="notes-app-area">
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/new" exact component={New} />
              <Route component={Error404} />
            </Switch>
          </div>
        </div>
      </main>
    </Router>
  );
}
