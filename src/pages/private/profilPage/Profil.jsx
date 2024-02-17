//  profil d'un utilisateur
//  avec la page timeline de l'utilisateur connecté, ce composant ne me semble plus utile.
// A effacer ?

import { FIREBASE_URL, auth } from "../../../firebase-config";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { GoHeart } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import AvatarManager from "./components/AvatarManager";
import InfosUSer from "./components/InfosUSer";

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
  const [errorFormBiography, setErrorFormBiography] = useState("");
  const [loading, setLoading] = useState();
  const [loginFollowedUsers, setLoginFollowedUsers] = useState([]);


 
  //Pour modifier la biographie de l'utilisateur
  async function handleFormBiography(e) {
    e.preventDefault();

    if (currentUserDatas.biography.trim() === "") {
      setErrorFormBiography(
        "Ne soyez pas timide ! Racontez-nous qui vous êtes en quelques mots !"
      );
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000);
      return;
    }

    if (currentUserDatas.biography.length > 200) {
      setErrorFormBiography(
        `200 caractères max, pas ${currentUserDatas.biography.length} ! On ne raconte pas TOUTE sa vie !!!`
      );
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000);
      return;
    }

    try {
      // Mettre à jour la biographie dans la base de données Firebase
      const updateResponse = await fetch(
        `https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ biography: currentUserDatas.biography }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update user biography");
      }

      // Mettre à jour la biographie dans currentUserDatas
      setCurrentUserDatas((prevData) => ({
        ...prevData,
        biography: currentUserDatas.biography,
      }));

      // Mettre à jour la biographie dans le sessionStorage
      const currentUserDataCopy = JSON.parse(
        sessionStorage.getItem("currentUserDatas")
      );
      currentUserDataCopy.biography = currentUserDatas.biography;
      sessionStorage.setItem(
        "currentUserDatas",
        JSON.stringify(currentUserDataCopy)
      );

      toast.success("Biographie mise à jour avec succès");
    } catch (error) {
      toast.error("Une erreur s'est produite :", error);
    }
  }
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
       
        <form
          className="flex flex-col mt-4 gap-x-4"
          onSubmit={handleFormBiography}
        >
          <textarea
            type="text"
            placeholder="Un petit de vous en 150 caractères max !"
            className="w-full h-24 p-2 text-white rounded-md bg-neutral-800"
            value={currentUserDatas.biography}
            onChange={(e) =>
              setCurrentUserDatas({
                ...currentUserDatas,
                biography: e.target.value,
              })
            }
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 mx-auto my-10 text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600"
          >
            Valider ma nouvelle présentation
          </button>
        </form>
        <p className={`mt-2 text-red-500 text-md`}>{errorFormBiography}</p>
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
