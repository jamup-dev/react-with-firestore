import fs from 'fs';
import path from 'path';
import * as firebase from '@firebase/testing';
// import side-effects from jest-dom
import '@testing-library/jest-dom/extend-expect';

import { projectId } from './utils/testHelpers';

// setup firebase for tests
const rules = fs.readFileSync(
  path.resolve(__dirname, '../firestore.rules'),
  'utf8'
);

// before starting the test package, load firestore rules
beforeAll(() => {
  return firebase.loadFirestoreRules({ projectId, rules });
});

// before every test, clear firestore data
beforeEach(() => {
  return firebase.clearFirestoreData({ projectId });
});

// after all test package, delete everything in app
afterAll(() => {
  return Promise.all(firebase.apps().map(app => app.delete()));
});
