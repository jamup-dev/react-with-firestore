import firebase from 'firebase/app';

// side-effect for firestore cloud database
import 'firebase/firestore';
// side-effect for firebase auth
import 'firebase/auth';

// create the project
const firebaseConfig = {
  apiKey: 'AIzaSyC58sELyGsF0EyX7UIWYbpqhjJ6StWrxR4',
  authDomain: 'beginner-react-a2bce.firebaseapp.com',
  databaseURL: 'https://beginner-react-a2bce.firebaseio.com',
  projectId: 'beginner-react-a2bce',
  storageBucket: 'beginner-react-a2bce.appspot.com',
  messagingSenderId: '2962677518',
  appId: '1:2962677518:web:6552f69d1f2bd3d9',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.firestore();
