import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_URL, auth } from "../firebase-config";
import { toast } from "sonner";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserDatas, setCurrentUserDatas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserDatas = sessionStorage.getItem("currentUserDatas");
    if (storedUserDatas) {
      setCurrentUserDatas(JSON.parse(storedUserDatas));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && !currentUserDatas) {
      getCurrentUserDatas(currentUser.uid);
    }
  }, [currentUser, currentUserDatas]);

  async function getCurrentUserDatas(uid) {
    try {
      setLoading(true);
      const response = await fetch(
        FIREBASE_URL+`users/${uid}.json`
      );
      if (!response.ok) {
        throw new Error("Erreur : mauvaise ressource.");
      }
      const data = await response.json();
      setCurrentUserDatas(data);
      sessionStorage.setItem("currentUserDatas", JSON.stringify(data));
    } catch (error) {
      console.error("Une erreur est survenue :", error);
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    sessionStorage.removeItem("currentUserDatas");
    signOut(auth);
    setCurrentUser(null);
    setCurrentUserDatas(null);
    toast.success("Vous êtes déconnecté !");
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
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
