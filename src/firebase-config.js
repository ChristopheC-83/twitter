// fichier d'initialisation de firebase
// données visibles dans la console
// infos sensibles à cachées dans .env.local

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_API_ID
};

export const FIREBASE_URL = "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export default app;
