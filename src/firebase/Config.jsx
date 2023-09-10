// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe_-DgEdKonvuUwoL07GhRZdz4sejzFi8",
  authDomain: "react-level2-a0c41.firebaseapp.com",
  projectId: "react-level2-a0c41",
  storageBucket: "react-level2-a0c41.appspot.com",
  messagingSenderId: "27748576114",
  appId: "1:27748576114:web:2a586ffe7e49067b6fcbeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth, createUserWithEmailAndPassword };