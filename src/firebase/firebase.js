import * as firebase from 'firebase';

//  the || 'a' is provided for JEST testing purposes only
const config = {
  apiKey: process.env.FIREBASE_API_KEY || 'a',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'a',
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://a.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'a',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'a',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 0
};

console.log('config');
console.log(config);

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
