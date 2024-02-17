//  profil d'un utilisateur
//  avec la page timeline de l'utilisateur connecté, ce composant ne me semble plus utile.
// A effacer ?

import { FIREBASE_URL, auth } from "../../../firebase-config";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { GoHeart } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import AvatarManager from "./components/AvatarManager";
import InfosUSer from "./components/InfosUSer";
import BiographyManager from "./components/BiographyManager";

export default function Profil() {
  const navigate = useNavigate();
  const {
    currentUser,
    currentUserDatas,
    setCurrentUserDatas,
    getCurrentUserDatas,
    logOut,
  } = useContext(UserContext);
  const [dateRegister, setDateRegister] = useState("");
  const [loading, setLoading] = useState();
  const [loginFollowedUsers, setLoginFollowedUsers] = useState([]);


 

  // supression du compte
  async function deleteAccount() {
    const deleteConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );

    if (deleteConfirmed) {
      try {
        // Récupérer l'ID de l'utilisateur actuellement connecté
        const userId = auth.currentUser.uid;

        // Supprimer l'utilisateur de Firebase Realtime Database en utilisant Fetch
        const response = await fetch(
          `https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
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

        // Supprimer le compte utilisateur actuellement connecté
        await auth.currentUser.delete();

        // Déconnexion de l'utilisateur
        logOut();

        // Vider le sessionStorage
        sessionStorage.removeItem("currentUserDatas");

        // Rediriger l'utilisateur vers une page d'accueil ou une autre page appropriée
        navigate("/");

        // Afficher un message de succès ou effectuer d'autres actions nécessaires
        toast.success("Votre compte a été supprimé avec succès.");
      } catch (error) {
        // En cas d'erreur, afficher un message d'erreur ou effectuer d'autres actions nécessaires
        toast.error(
          "Une erreur s'est produite lors de la suppression de votre compte :",
          error.message
        );
      }
    }
  }

  // // récupérer le login d'un userFollowed avec son id
  const fetchUserLogin = async (userId) => {
    try {
      const response = await fetch(FIREBASE_URL + `users/${userId}.json`);

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des données de l'utilisateur"
        );
      }

      const userData = await response.json();
      return { login: userData.login, avatarUrl: userData.avatar_url }; //
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération du login de l'utilisateur :",
        error
      );
      return null; // Retourner null en cas d'erreur
    }
  };

  useEffect(() => {
    if (currentUserDatas.users_followed) {
      const getUsersFollowedLogin = async () => {
        try {
          const usersData = [];
          for (const userId of currentUserDatas.users_followed) {
            const userData = await fetchUserLogin(userId); // Utilise fetchUserLogin au lieu de fetchUserData
            usersData.push(userData);
          }
          setLoginFollowedUsers(usersData);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données des utilisateurs suivis :",
            error
          );
        }
      };

      getUsersFollowedLogin();
    }
  }, [currentUserDatas.users_followed]);

  useEffect(() => {
    console.log("currentUserDatas", currentUserDatas);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col w-full p-4 rounded shadow-md mb-36 sm:p-6 md:p-8">
      <div className="flex flex-col">
        <div className="w-12 h-12 p-2 ml-auto text-2xl text-white bg-red-700 border-2 border-white rounded-full cursor-pointer flexMid">
          <FaRegTrashAlt onClick={deleteAccount} />
        </div>
        <img
          src={currentUserDatas.avatar_url}
          alt="avatar"
          className="object-cover mx-auto mb-6 rounded-full size-52"
        />
        <h2 className="mx-auto mb-4 text-2xl font-bold text-center sm:text-3xl">
          {currentUserDatas.login}
        </h2>
        <AvatarManager/>
        <InfosUSer/>
       <BiographyManager/>
        {(!currentUserDatas.users_followed ||
          currentUserDatas.users_followed.length === 0) && (
          <p className="mt-4 text-center text-md">
            Vous n'avez pas encore de favoris
          </p>
        )}
        {currentUserDatas.users_followed &&
          currentUserDatas.users_followed.length >= 1 && (
            <div className="flex flex-col gap-y-10">
              <div className="flex items-center my-2 text-3xl gap-x-3">
                <GoHeart className="mr-1" />
                Mes Favoris :
              </div>
              <ul className="flex flex-col ml-8 gap-y-4">
                {loginFollowedUsers.map((userData, index) => (
                  <NavLink
                    key={currentUserDatas.users_followed[index]}
                    to={`/user/${currentUserDatas.users_followed[index]}`}
                    className={`flex justify-start items-center gap-x-8`}
                  >
                    <img
                      src={userData.avatarUrl}
                      alt={`Avatar de ${userData.login}`}
                      className="w-24 h-24 rounded-full"
                    />
                    <p className="text-3xl font-semibold">{userData.login}</p>
                  </NavLink>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
