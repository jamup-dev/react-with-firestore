import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';

import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Spinner from './components/Spinner';
import Error404 from './components/404';
import Provider from './components/Provider';
import { useSetupNotesWithAuth } from './utils/note';
import { useAuth } from './utils/auth';

import Home from './routes/Home';
import Note from './routes/Note';
import New from './routes/New';
import Signin from './routes/Signin';

function App({ firebaseAuth, firebaseDb }) {
  // get current auth status from our custom hook
  const auth = useAuth(firebaseAuth);
  // we will pass it down using userContext.Provider to all child components
  const [notes, dispatch, noteLoading, noteError] = useSetupNotesWithAuth(
    auth,
    firebaseDb
  );

  // if there is an error, show a toast message
  useEffect(() => {
    if (noteError) {
      toast.error(
        noteError && noteError.message ? noteError.message : noteError,
        {
          autoClose: false,
        }
      );
    }
  }, [noteError]);

  return (
    <Provider
      auth={auth}
      notes={notes}
      dispatch={dispatch}
      noteLoading={noteLoading}
    >
      <Router>
        <header>
          <Nav firebaseAuth={firebaseAuth} />
        </header>
        <main
          className={classNames('notes-app', 'section', {
            'notes-app--loading': auth.initializing || noteLoading,
          })}
        >
          {auth.initializing || noteLoading ? (
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
                    <Route
                      path="/signin"
                      render={({ history }) => (
                        <Signin history={history} firebaseAuth={firebaseAuth} />
                      )}
                    />
                    <Route component={Error404} />
                  </Switch>
                </div>
              </div>
            </>
          )}
        </main>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
