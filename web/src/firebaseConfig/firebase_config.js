import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBxVXMjKJt3WzDXXowO4HAiY3odiDf_MQI",
  authDomain: "avalicao-taugor.firebaseapp.com",
  projectId: "avalicao-taugor",
  storageBucket: "avalicao-taugor.appspot.com",
  messagingSenderId: "428137732050",
  appId: "1:428137732050:web:d8a3d58cc2d42233d39a0b",
  measurementId: "G-95NBG4JNXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export default db;