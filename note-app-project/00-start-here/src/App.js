import React from 'react';

import './style.scss';

export default function App() {
  return (
    <>
      <header>Here be header</header>
      <main className="notes-app section">
        Here be sidebar
        <div className="notes-app-area">
          <div className="container">Here be our app stuff</div>
        </div>
      </main>
    </>
  );
}
