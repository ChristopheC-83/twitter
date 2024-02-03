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

  

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loadingPerso,
        setLoadingPerso,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
