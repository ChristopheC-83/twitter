//  profil d'un utilisateur
//  avec la page timeline de l'utilisateur connecté, ce composant ne me semble plus utile.
// A effacer ?

import { auth } from "../../firebase-config";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

import { toast } from "sonner";

export default function Profil() {
  // const navigate=useNavigate();
  const { currentUser, loading } = useContext(UserContext);
  console.log(currentUser);

  async function getAllUsersFromDatabase() {
    try {
      const response = await fetch(
        "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );

      const data = await response.json();
      console.log(data);
      setAllUsers(data); // Mettre à jour le state avec les utilisateurs récupérés
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  }

  function findUserIdByMail(email) {
    const allUsers = getAllUsersFromDatabase();
    for (const userId in allUsers) {
      if (allUsers[userId].email === email) {
        console.log(userId);
        return userId;
      }
    }
    return null; // Retourne null si aucun utilisateur n'a été trouvé avec l'email spécifié
  }

  useEffect(() => {
    if (currentUser) {
      console.log(findUserIdByMail(currentUser.email));
    }
  }, [allUsers]);

  // sécurité
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!auth.currentUser ? (
        <div>connectez-vous</div>
      ) : (
        <div>Page de profil</div>
      )}
    </>
  );
}
