// L'encart de présentation de l'utilisateur

import { useEffect, useState, useContext } from "react";
import { dateReadableShort } from "../../../../utils/readDate";
import { UserContext } from "../../../../context/userContext";
import LoadingComponent from "../../../commonsComponents/toolsComponents/LoadingComponent";
import { LuCalendarDays, LuLink2, LuMail } from "react-icons/lu";

import { FIREBASE_URL } from "../../../../firebase-config";
import { toast } from "sonner";

export default function HeaderUser({ user_id }) {
  const { currentUserDatas, setCurrentUserDatas } = useContext(UserContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUser(user_id) {
    try {
      const response = await fetch(FIREBASE_URL + `users/${user_id}.json`);
      if (!response.ok) {
        throw new Error("On n'a pas truvé l'utilisateur !");
      }
      const user = await response.json();
      setLoading(false);
      setUser(user);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  // pour s'y abboner
  async function handleFormFollowing() {
    try {
      //A t on bine un currentUser en cours ?
      if (!currentUserDatas) {
        throw new Error("Utilisateur actuel non disponible.");
      }

      // users_followed initiliasé comme un tableau ?
      const usersFollowed = currentUserDatas.users_followed || [];

      // Vérifiez si l'utilisateur est déjà suivi
      if (usersFollowed.includes(user_id)) {
        throw new Error("L'utilisateur est déjà suivi.");
      }

      // Mettre à jour users_followed avec le nouvel utilisateur suivi
      const updatedUsersFollowed = [...usersFollowed, user_id];

      // Mettre à jour currentUserDatas avec le nouveau tableau users_followed
      const updatedCurrentUserDatas = {
        ...currentUserDatas,
        users_followed: updatedUsersFollowed,
      };

      // Effectuer la mise à jour dans la base de données en temps réel
      const response = await fetch(
        FIREBASE_URL + `users/${currentUserDatas.uid}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            users_followed: updatedUsersFollowed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Echec de l'ajout en favoris.");
      }

      // Mettre à jour currentUserDatas dans le contexte utilisateur
      setCurrentUserDatas(updatedCurrentUserDatas);

      // Mettre à jour sessionStorage avec les données mises à jour
      sessionStorage.setItem(
        "currentUserDatas",
        JSON.stringify(updatedCurrentUserDatas)
      );

      // Afficher un message de succès
      toast.success("Utilisateur suivi avec succès.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  // pour s'en désabonner
  async function handleFormUnFollowing() {
    try {
      // Vérifier si currentUserDatas est disponible
      if (!currentUserDatas) {
        throw new Error("Utilisateur actuel non disponible.");
      }

      // Vérifier si users_followed est initialisé comme un tableau
      const usersFollowed = currentUserDatas.users_followed || [];

      // Vérifier si l'utilisateur est déjà suivi
      if (!usersFollowed.includes(user_id)) {
        throw new Error("L'utilisateur n'est pas déjà suivi.");
      }

      // Supprimer l'utilisateur de la liste des utilisateurs suivis
      const updatedUsersFollowed = usersFollowed.filter(
        (followedUser) => followedUser !== user_id
      );

      // Mettre à jour currentUserDatas avec le nouveau tableau users_followed
      const updatedCurrentUserDatas = {
        ...currentUserDatas,
        users_followed: updatedUsersFollowed,
      };

      // Effectuer la mise à jour dans la base de données en temps réel
      const response = await fetch(
        FIREBASE_URL + `users/${currentUserDatas.uid}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            users_followed: updatedUsersFollowed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Echec de la suppression de l'abonnement.");
      }

      // Mettre à jour currentUserDatas dans le contexte utilisateur
      setCurrentUserDatas(updatedCurrentUserDatas);

      // Mettre à jour sessionStorage avec les données mises à jour
      sessionStorage.setItem(
        "currentUserDatas",
        JSON.stringify(updatedCurrentUserDatas)
      );

      // Afficher un message de succès
      toast.success("Désabonnement réussi.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUser(user_id);
  }, [user_id]);

  // boutton modulable en fonction de si on y est déjà abonné ou non
  // s'abonner <=> se désabonner
  function renderFollowButton() {
    let buttonFollowing;
    if (
      !currentUserDatas.users_followed ||
      currentUserDatas.users_followed.length === 0
    ) {
      buttonFollowing = (
        <button
          onClick={handleFormFollowing}
          className="h-8 bg-blue-500 rounded-md w-28 text-neutral-50 hover:bg-blue-600"
        >
          S'abonner
        </button>
      );
    } else if (
      user.login !== currentUserDatas.login &&
      (!currentUserDatas.users_followed ||
        !currentUserDatas.users_followed.includes(user_id))
    ) {
      buttonFollowing = (
        <button
          onClick={handleFormFollowing}
          className="h-8 bg-blue-500 rounded-md w-28 text-neutral-50 hover:bg-blue-600"
        >
          S'abonner
        </button>
      );
    } else if (
      user &&
      user.login !== currentUserDatas.login &&
      currentUserDatas.users_followed &&
      currentUserDatas.users_followed.includes(user_id)
    ) {
      buttonFollowing = (
        <button
          onClick={handleFormUnFollowing}
          className="w-32 h-8 bg-blue-500 rounded-md text-neutral-50 hover:bg-blue-600"
        >
          Se désabonner
        </button>
      );
    }
    return buttonFollowing;
  }
  
  // rendu contidionnel
  if (loading) return <LoadingComponent />;
  if (error)
    return <div className="pt-24 text-center">Une erreur est survenue !</div>;
  if (!loading && !error) {
    return (
      <div className="flex flex-col items-start w-full p-4 pt-8 border-b border-neutral-500 h-min ">
        <div className="flex flex-col items-center justify-center w-full mb-8 gap-x-4 font-md sm:font-lg">
          <div className="flex items-center w-full justify-evenly ">
            <img
              src={user.avatar_url}
              alt="profil"
              className="object-cover w-48 h-48 rounded-full"
            />
          </div>
          <div className="w-full sm:px-6 md:px-8">
            <div className="flex items-center">
              <h2 className="py-4 mx-auto text-2xl font-bold text-center sm:text-3xl">
                {user.login}
              </h2>
            </div>
            {/* Bouton accessible ssi connecté */}
            {currentUserDatas && (
              <div className="flex items-center justify-center mb-8">
                {currentUserDatas.login !== user.login && renderFollowButton()}
              </div>
            )}
            <div className="flex items-center gap-x-3">
              <LuCalendarDays className="mt-1 mr-1" /> :{" "}
              <p>{dateReadableShort(user.register_since)}</p>
            </div>
            <div className="flex items-center gap-x-3">
              <LuMail className="mt-1 mr-1" /> : <p>{user.email}</p>
            </div>
            {/* <div className="flex items-center gap-x-3">
              <LuLink2 className="mt-1 mr-1" /> :{" "}
              <a href={user.personnalLink} className="text-blue-500">
                {user.personnalLink}
              </a>
            </div> */}
          </div>
        </div>
        <div className="font-thin text-md sm:text-lg text-neutral-300">
          {user.biography}
        </div>
      </div>
    );
  }
}
