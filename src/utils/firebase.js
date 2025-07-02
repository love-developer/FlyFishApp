// utils/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5mQT5XTpaW8JFaQJ9nS-T8sIS66Qfxnw",
  authDomain: "flyfish-testing.firebaseapp.com",
  projectId: "flyfish-testing",
  storageBucket: "flyfish-testing.appspot.com",
  messagingSenderId: "314575144287",
  appId: "1:314575144287:web:9f698819dc09d32d4e22ea",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
