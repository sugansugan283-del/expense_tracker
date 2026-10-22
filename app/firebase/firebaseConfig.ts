// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtXWVvjn2YYTxmD0WVnqIrpe017FS4_wI",
  authDomain: "expense-tracker-82fc1.firebaseapp.com",
  projectId: "expense-tracker-82fc1",
  storageBucket: "expense-tracker-82fc1.firebasestorage.app",
  messagingSenderId: "19794148846",
  appId: "1:19794148846:web:0f1669343d59e89bcba2ff",
  measurementId: "G-3L7J0FYLMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);