import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDrJKe1xXmi0ycNk5gU8sUzJiLaFkuqrKM",
    authDomain: "crud-63f93.firebaseapp.com",
    projectId: "crud-63f93",
    storageBucket: "crud-63f93.appspot.com",
    messagingSenderId: "616257184493",
    appId: "1:616257184493:web:dd4d2b698b239cd53062e4"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)