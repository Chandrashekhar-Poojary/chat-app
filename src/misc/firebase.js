import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGPKXOK5e_GNRk0SJFJ0_BwMrogpoYbl0",
  authDomain: "chat-web-app-ee5ec.firebaseapp.com",
  databaseURL: "https://chat-web-app-ee5ec-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-ee5ec",
  storageBucket: "chat-web-app-ee5ec.appspot.com",
  messagingSenderId: "1091230451927",
  appId: "1:1091230451927:web:cbcbffa3df8a60a2504892"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = app.database();
const storage = app.storage();
export { app, auth, database, storage};

