import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';

import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Spinner from './components/Spinner';
import Error404 from './components/404';
import { useSetupNotesWithAuth, notesCtx, noteDispatchCtx } from './utils/note';
import { useAuth, userContext } from './auth/user';

import Home from './routes/Home';
import Note from './routes/Note';
import New from './routes/New';
import Signin from './routes/Signin';

function App() {
  // get current auth status from our custom hook
  const auth = useAuth();
  // we will pass it down using userContext.Provider to all child components
  const [notes, dispatch, notesLoading] = useSetupNotesWithAuth(auth);

  return (
    <userContext.Provider value={auth}>
      <Router>
        <notesCtx.Provider value={notes}>
          <noteDispatchCtx.Provider value={dispatch}>
            <header>
              <Nav />
            </header>
            <main
              className={classNames('notes-app', 'section', {
                'notes-app--loading': auth.initializing || notesLoading,
              })}
            >
              {auth.initializing || notesLoading ? (
                <Spinner />
              ) : (
                <>
                  <Sidebar />
                  <div className="notes-app-area">
                    <div className="container">
                      <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/new" exact component={New} />
                        <Route path="/note/:noteId" component={Note} />
                        <Route path="/signin" component={Signin} />
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
    </userContext.Provider>
  );
}

export default App;
