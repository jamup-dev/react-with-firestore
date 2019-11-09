// import side-effects from jest-dom
import '@testing-library/jest-dom/extend-expect';

// we mock default firebase in utils with the test database
jest.mock('./utils/firebase.js', () => {
  const firebaseTest = require('./utils/firebase.testserver.js');
  return firebaseTest;
});
