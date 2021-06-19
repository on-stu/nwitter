import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCFqBFUERyG86duSFH6QgiTdn1LW4U-ZjA",
    authDomain: "fir-practice-55cc5.firebaseapp.com",
    projectId: "fir-practice-55cc5",
    storageBucket: "fir-practice-55cc5.appspot.com",
    messagingSenderId: "253577554696",
    appId: "1:253577554696:web:821ba5393de6503d22dabd",
    measurementId: "G-2JT7BLZHQK"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
  
  export const firebaseInstance = firebase;
  export const authService = firebase.auth();
  export const dbService = firebase.firestore();
  export const storageService = firebase.storage();