import firebase from 'firebase/app';

// side-effect for firestore cloud database
import 'firebase/firestore';
// side-effect for firebase auth
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyClJEKNIbNDHW6MlNcA826szHh-W5BgqsE',
  authDomain: 'beginner-react-test.firebaseapp.com',
  databaseURL: 'https://beginner-react-test.firebaseio.com',
  projectId: 'beginner-react-test',
  storageBucket: 'beginner-react-test.appspot.com',
  messagingSenderId: '718735236130',
  appId: '1:718735236130:web:446537a6988cb045563e7b',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
