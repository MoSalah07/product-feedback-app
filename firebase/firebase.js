import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMqmjNCpOuTQgvVDoXYQvD6OmV1RFIJ00",
  authDomain: "next-js-8ac11.firebaseapp.com",
  databaseURL: "https://next-js-8ac11-default-rtdb.firebaseio.com",
  projectId: "next-js-8ac11",
  storageBucket: "next-js-8ac11.appspot.com",
  messagingSenderId: "800220258213",
  appId: "1:800220258213:web:eef043c5fab5c0dbdf524c"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
const db = getFirestore( app );

export default db;