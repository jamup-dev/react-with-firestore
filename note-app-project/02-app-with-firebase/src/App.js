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
import Provider from './components/Provider';
import { useSetupNotesWithAuth } from './utils/note';
import { useAuth } from './auth/user';

import Home from './routes/Home';
import Note from './routes/Note';
import New from './routes/New';
import Signin from './routes/Signin';

function App() {
  // get current auth status from our custom hook
  const auth = useAuth();
  // we will pass it down using userContext.Provider to all child components
  const [notes, dispatch, noteLoading] = useSetupNotesWithAuth(auth);

  return (
    <Provider
      auth={auth}
      notes={notes}
      dispatch={dispatch}
      noteLoading={noteLoading}
    >
      <Router>
        <header>
          <Nav />
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
                    <Route path="/signin" component={Signin} />
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
