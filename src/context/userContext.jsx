import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingPerso, setLoadingPerso] = useState(true);

  function signUp(email, pwd) {
    createUserWithEmailAndPassword(auth, email, pwd);
    // on ajoute nom à liste user pour vérifier si pseudo dispo à l'inscription
    // on ajoute nom à liste des users + leurs infos pour leur fiche perso
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loadingPerso,
        setLoadingPerso,signUp, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
