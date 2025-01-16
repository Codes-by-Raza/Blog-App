
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import {
  setDoc,
  getFirestore,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaWFnN0UEVtWfI9Y-3xc56GTk_S7iOb0Y",
  authDomain: "login-signup-1-4b35b.firebaseapp.com",
  projectId: "login-signup-1-4b35b",
  storageBucket: "login-signup-1-4b35b.firebasestorage.app",
  messagingSenderId: "647288357738",
  appId: "1:647288357738:web:18d5e242f6d482ae0f5b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  app,
  getAuth,
  createUserWithEmailAndPassword,
  auth,
  doc,
  setDoc,
  db,
  signInWithEmailAndPassword,
  getDoc,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
};