import { FaRegTrashAlt } from "react-icons/fa";
import { FIREBASE_URL } from "../../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import { toast } from "sonner";
import { auth } from "../../../../firebase-config";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const {
    currentUser,
    currentUserDatas,
    setCurrentUserDatas,
    getCurrentUserDatas,
    logOut,
  } = useContext(UserContext);

  // supression du compte
  async function deleteAccount() {
    // popup de validation... au cas où  !
    const deleteConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );

    if (deleteConfirmed) {
      try {
        // Supprimer l'utilisateur de Firebase Realtime Database en utilisant Fetch
        const response = await fetch(
          FIREBASE_URL + `users/${currentUser.uid}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user data from Realtime Database");
        }

        // Supprimer le compte utilisateur de google Auth
        await auth.currentUser.delete();

        // Déconnexion de l'utilisateur
        logOut();

        // Vider le sessionStorage
        sessionStorage.removeItem("currentUserDatas");

        navigate("/");
        toast.success("Votre compte a été supprimé avec succès.");
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la suppression de votre compte :",
          error.message
        );
      }
    }
  }

  return (
    <div className="w-12 h-12 p-2 ml-auto text-2xl text-white bg-red-700 border-2 border-white rounded-full cursor-pointer flexMid">
      <FaRegTrashAlt onClick={deleteAccount} />
    </div>
  );
}
