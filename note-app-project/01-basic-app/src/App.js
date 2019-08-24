import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './style.scss';

import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Error404 from './components/404';
import { useNotes, notesCtx, noteDispatchCtx } from './utils/note';

import Home from './routes/Home';
import View from './routes/View';
import New from './routes/New';

function App() {
  const [notes, dispatch] = useNotes();

  const sidebarLinks = notes.map(note => ({
    label: note.title,
    to: `/note/${note.id}`,
  }));

  return (
    <Router>
      <notesCtx.Provider value={notes}>
        <noteDispatchCtx.Provider value={dispatch}>
          <header>
            <Nav />
          </header>
          <main className="notes-app section">
            <Sidebar links={sidebarLinks} />
            <div className="notes-app-area">
              <div className="container">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/new" component={New} />
                  <Route path="/note/:noteId" component={View} />
                  <Route component={Error404} />
                </Switch>
              </div>
            </div>
          </main>
        </noteDispatchCtx.Provider>
      </notesCtx.Provider>
    </Router>
  );
}

export default App;
