import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './style.scss';

import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Home from './routes/Home';
import View from './routes/View';
import Error404 from './components/404';
import { useNotes, notesCtx } from './utils/note';

function App() {
  const [notes] = useNotes();

  const sidebarLinks = notes.map(note => ({
    label: note.title,
    to: `/note/${note.id}`,
  }));

  return (
    <Router>
      <notesCtx.Provider value={notes}>
        <header>
          <Nav />
        </header>
        <main className="notes-app section">
          <Sidebar links={sidebarLinks} />
          <div className="notes-app-area">
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/note/:noteId" component={View} />
                <Route component={Error404} />
              </Switch>
            </div>
          </div>
        </main>
      </notesCtx.Provider>
    </Router>
  );
}

export default App;
