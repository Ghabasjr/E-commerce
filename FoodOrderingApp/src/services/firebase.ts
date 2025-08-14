// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCeR9MT2JCzpj_h1BHjV5glY1odw2zVp0E",
  authDomain: "foodorderingapp-69f8b.firebaseapp.com",
  projectId: "foodorderingapp-69f8b",
  messagingSenderId: "510365741349",
  appId: "1:510365741349:web:cd0585f272ec5fe38caacc",
  measurementId: "G-YF9WM9FLCP"
};

// Initialize Firebase - prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);