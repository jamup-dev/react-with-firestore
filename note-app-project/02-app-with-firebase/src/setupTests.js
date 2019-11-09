const firebaseTest = require('./utils/firebase.testserver.js');

// we mock default firebase in utils with the test database
jest.mock('./utils/firebase.js', () => {
  return firebaseTest;
});

firebaseTest.default
  .auth()
  .signInWithEmailAndPassword('swashata-test@wpquark.com', '123456');
