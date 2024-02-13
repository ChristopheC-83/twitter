import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "sonner";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserDatas, setCurrentUserDatas] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });
  }, [currentUser]);

  async function getCurrentUserDatas(uid) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
      );
      if (!response.ok) {
        throw new Error("Erreur : mauvaise ressource.");
      }
      const data = await response.json();
      setCurrentUserDatas(data);
    } catch (error) {
      console.error("Une erreur est survenue :", error);
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    toast.success("Vous êtes déconnecté");
    // setLoading(true);
    auth.signOut(auth);
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentUserDatas,
        setCurrentUserDatas,
        loading,
        setLoading,
        getCurrentUserDatas,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
