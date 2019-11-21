import fs from 'fs';
import path from 'path';

// import side-effects from jest-dom
import '@testing-library/jest-dom/extend-expect';

// we mock default firebase in utils with the test database
jest.mock('./utils/firebase.js', () => {
  const firebaseTest = require('./utils/firebase.testserver.js');
  return firebaseTest;
});

// setup firebase for tests
const firebase = require('@firebase/testing');
const projectId = 'firestore-emulator-notes-app';
const rules = fs.readFileSync(
  path.resolve(__dirname, '../firestore.rules'),
  'utf8'
);

beforeEach(() => {
  return firebase.clearFirestoreData({ projectId });
});

beforeAll(() => {
  return firebase.loadFirestoreRules({ projectId, rules });
});

afterAll(() => {
  return Promise.all(firebase.apps().map(app => app.delete()));
});
