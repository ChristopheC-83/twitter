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
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import AvatarManager from "./components/AvatarManager";
import InfosUSer from "./components/InfosUSer";
import BiographyManager from "./components/BiographyManager";
import DeleteAccount from "./components/DeleteAccount";
import AvatarNameUser from "./components/AvatarNameUser";

export default function Profil() {
  const navigate = useNavigate();
  const {
    currentUser,
    currentUserDatas,
    setCurrentUserDatas,
    getCurrentUserDatas,
    logOut,
  } = useContext(UserContext);
  const [loading, setLoading] = useState();
  const [loginFollowedUsers, setLoginFollowedUsers] = useState([]);

  // récupérer le login d'un userFollowed avec son id
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

  // Fonction pour supprimer l'utilisateur de la liste suivie dans Firebase
  const removeUserFromFollowedList = async (userIdToRemove) => {
    try {
      const updatedFollowedList = currentUserDatas.users_followed.filter(
        (userId) => userId !== userIdToRemove
      );
      await fetch(FIREBASE_URL + `users/${currentUser.uid}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users_followed: updatedFollowedList,
        }),
      });
      console.log(
        `L'utilisateur avec l'ID ${userIdToRemove} a été supprimé de la liste des utilisateurs suivis.`
      );
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'utilisateur de la liste des utilisateurs suivis :",
        error
      );
    }
  };

  useEffect(() => {
    if (currentUserDatas.users_followed) {
      const getUsersFollowedLogin = async () => {
        try {
          const usersData = [];
          const updatedUsersFollowed = []; // Pour stocker les IDs des utilisateurs suivis encore inscrits
          for (const userId of currentUserDatas.users_followed) {
            const userData = await fetchUserLogin(userId);
            if (userData) {
              usersData.push(userData);
              updatedUsersFollowed.push(userId); // Ajouter l'ID à la liste mise à jour
            } else {
              console.log(
                `L'utilisateur avec l'ID ${userId} ne peut pas être trouvé.`
              );
              await removeUserFromFollowedList(userId);
              shouldUpdate = true; // Indiquer qu'une mise à jour est nécessaire
            }
          }
          // Mettre à jour currentUserDatas uniquement si nécessaire
          if (shouldUpdate) {
            setCurrentUserDatas((prevData) => ({
              ...prevData,
              users_followed: updatedUsersFollowed,
            }));
          }
          // Mettre à jour currentUserDatas avec les données et les IDs des utilisateurs suivis
          setCurrentUserDatas((prevData) => ({
            ...prevData,
            users_followed: updatedUsersFollowed,
          }));
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
        <DeleteAccount />
        <AvatarNameUser />
        <AvatarManager />
        <InfosUSer />
        <BiographyManager />
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
                      className="object-cover w-24 h-24 rounded-full"
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
