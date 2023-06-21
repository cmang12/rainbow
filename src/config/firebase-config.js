// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; 
import {getAuth, GoogleAuthProvider} from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUXNdyLe6CktAbs1QMJthyCh588hf6vXQ",
  authDomain: "myvirtualdiary-65cb1.firebaseapp.com",
  projectId: "myvirtualdiary-65cb1",
  storageBucket: "myvirtualdiary-65cb1.appspot.com",
  messagingSenderId: "581062453633",
  appId: "1:581062453633:web:260985753207015964a080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider(); 