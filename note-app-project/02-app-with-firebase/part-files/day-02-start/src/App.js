import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';

import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Error404 from './components/404';
import Spinner from './components/Spinner';

import Home from './routes/Home';
import New from './routes/New';
import Note from './routes/Note';
import Signin from './routes/Signin';

import { notesCtx, noteDispatchCtx, useNotes } from './utils/note';
import { useAuth, authCtx } from './utils/auth';

export default function App() {
  const [notes, dispatch] = useNotes();
  const user = useAuth();

  const sidebarLinks = notes.map(note => ({
    to: `/note/${note.id}`,
    label: note.title,
  }));

  // note/noteId1
  // note/noteId2
  // http://localhost:3000/note/c93bb801-dc6a-48fd-b8e2-00f0833eda5a/edit/edit/can

  return (
    <authCtx.Provider value={user}>
      <Router>
        <notesCtx.Provider value={notes}>
          <noteDispatchCtx.Provider value={dispatch}>
            <header>
              <Nav />
            </header>
            <main
              className={classNames('notes-app section', {
                'notes-app--loading': user.initializing,
              })}
            >
              {user.initializing ? (
                <Spinner />
              ) : (
                <>
                  <Sidebar links={sidebarLinks} />
                  <div className="notes-app-area">
                    <div className="container">
                      <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/new" exact component={New} />
                        <Route path="/signin" exact component={Signin} />
                        <Route path="/note/:noteId" component={Note} />
                        <Route component={Error404} />
                      </Switch>
                    </div>
                  </div>
                </>
              )}
            </main>
            <ToastContainer />
          </noteDispatchCtx.Provider>
        </notesCtx.Provider>
      </Router>
    </authCtx.Provider>
  );
}
