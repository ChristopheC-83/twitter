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
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
      console.log("currentUser", currentUser.uid);
    });
  }, [currentUser]);

  


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
        loading,
        setLoading,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
