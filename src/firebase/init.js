import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCS3o7WzIhkFxwp8PqV4-QKPudOvKFc-ms',
  authDomain: 'aschat-vue.firebaseapp.com',
  databaseURL: 'https://aschat-vue.firebaseio.com',
  projectId: 'aschat-vue',
  storageBucket: 'aschat-vue.appspot.com',
  messagingSenderId: '812818479215',
  appId: '1:812818479215:web:69584beb4dd8af8fc6359a',
  measurementId: 'G-SHN5ZWYCZ6',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export {
  firebase,
  auth,
  db,
};
