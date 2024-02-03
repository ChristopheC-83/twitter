// fichier d'initialisation de firebase
// données visibles dans la console
// infos sensibles à cachées dans .env.local

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyA4OoFxGmzOUjfs7te7xnBJQshm-rDoLkQ",
  // authDomain: "twitest-9f90c.firebaseapp.com",
  // databaseURL:
  //   "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app",
  // projectId: "twitest-9f90c",
  // storageBucket: "twitest-9f90c.appspot.com",
  // messagingSenderId: "97981206464",
  // appId: "1:97981206464:web:e10a9d6bdeb581a50ec225",

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_API_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export default app;
