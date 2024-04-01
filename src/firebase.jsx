// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq3jqZ2FmC2KPNfduJgvRLnq2AAKkSQbU",
  authDomain: "react-instagram-clone-1a854.firebaseapp.com",
  projectId: "react-instagram-clone-1a854",
  storageBucket: "react-instagram-clone-1a854.appspot.com",
  messagingSenderId: "1015323253245",
  appId: "1:1015323253245:web:f12f8e2b955cbb4f45e194",
  measurementId: "G-1YGFPTRSYK"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
//const analytics = getAnalytics(app);