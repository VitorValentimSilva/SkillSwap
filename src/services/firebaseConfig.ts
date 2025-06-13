import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuqWNo1jPmRrXrS9WWM-eb95ikF6riNjc",
  authDomain: "skillswap-9e8ef.firebaseapp.com",
  projectId: "skillswap-9e8ef",
  storageBucket: "skillswap-9e8ef.firebasestorage.app",
  messagingSenderId: "887379453673",
  appId: "1:887379453673:web:21ec62d2add6d9b2ceb278",
  measurementId: "G-3FHMCLVQ8H",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
