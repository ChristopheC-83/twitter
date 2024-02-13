//  profil d'un utilisateur
//  avec la page timeline de l'utilisateur connecté, ce composant ne me semble plus utile.
// A effacer ?

import { auth } from "../../firebase-config";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { LuMail } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Profil() {
  const navigate = useNavigate();
  const { currentUser, currentUserDatas, loading, getCurrentUserDatas } =
    useContext(UserContext);

  console.log("currentUser : ", currentUser);
  console.log("currentUserDatas : ", currentUserDatas);

  //  affichage lisible de la date d'inscription

  const [dateResgiter, setDateRegister] = useState("");

  useEffect(() => {
    if (currentUserDatas && currentUserDatas.register_since) {
      const formattedDate = new Date(
        parseInt(currentUserDatas.register_since, 10)
      ).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDateRegister(formattedDate);
    }
  }, [currentUserDatas]);

  // ref pour formulaire
  //  le formaulaire bi
  const avatar_url = useRef("");

  //   messages d'erreur

  const [errorFormAvatar, setErrorFormAvatar] = useState("");
  const [errorFormBiography, setErrorFormBiography] = useState("");

  //   Fonctions

  // charger l'utilisateur
  async function loadUser() {
    loading(true);
    await getCurrentUserDatas(currentUser.uid);
    loading(false);
  }

  if (!currentUserDatas) {
    loadUser();
  }

  async function handleFormAvatar(userID, newAvatarUrl) {
    // e.preventDefault();

    // Vérification si l'URL est vide
    if (avatar_url.current.value.trim() === "") {
      setErrorFormAvatar(
        "Vous devez renseigner une URL si vous souhaitez modifier votre avatar !"
      );
      setTimeout(() => {
        setErrorFormAvatar("");
      }, 3000);
      return;
    }
    // Vérification de l'URL pour une images avec un regex
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/;
    if (!urlRegex.test(avatar_url.current.value)) {
      setErrorFormAvatar("L'URL que vous avez entrée n'est pas valide !");
      setTimeout(() => {
        setErrorFormAvatar("");
      }, 3000);
      return;
    }

    try {
      // Mettre à jour uniquement l'URL de l'avatar dans la base de données Firebase
      const updateResponse = await fetch(
        `https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users/${userID}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatar_url: newAvatarUrl }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update user avatar URL");
      }

      console.log("Avatar URL updated successfully");
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // Mise à jour de l'avatar de l'utilisateur
    // #########################################
  }

  function handleFormBiography(e) {
    e.preventDefault();

    // Vérification si la biographie est vide
    if (currentUserDatas.biography.trim() === "") {
      setErrorFormBiography(
        "Ne soyez pas timide ! Racontez-nous qui vous êtes en quelques mots !"
      );
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000); // Augmentation de la durée à 5 secondes
      return;
    }

    // Vérification de la longueur de la biographie
    if (currentUserDatas.biography.length > 150) {
      setErrorFormBiography(
        "150 caractères max, on ne raconte pas TOUTE sa vie !!!"
      );
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000); // Augmentation de la durée à 5 secondes
      return;
    }
  }

  function deleteAccount() {
    const deleteConfirmed = confirm(
      "Etes-vous sûr de vouloir supprimer votre compte ?"
    );
    if (deleteConfirmed) {
      console.log("Suppression du compte");
      logOut();
      navigate("/");
    }
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col w-full p-4 border-b rounded shadow-md sm:p-6 md:p-8 border-neutral-500 bg-neutral-900">
      <div className="flex flex-col">
        <div className="w-12 h-12 p-2 ml-auto text-2xl text-white bg-red-800 border-2 border-white rounded-full flexMid">
          <FaRegTrashAlt onClick={deleteAccount} />
        </div>
        <img
          src={currentUserDatas.avatar_url}
          alt="avatar"
          className="rounded-full max-w-[300px] mx-auto mb-6"
        />
        <h2 className="mx-auto mb-4 text-2xl font-bold text-center sm:text-3xl">
          {currentUserDatas.login}
        </h2>
        {/* formulaire de modification de l'avatar */}
        <form className="flex gap-x-4">
          <input
            type="text"
            ref={avatar_url}
            placeholder="url de votre nouvel avatar"
            className="w-4/5 p-2 text-white rounded-md bg-neutral-800"
          />
          <button
            onClick={() =>
              handleFormAvatar(currentUserDatas.id, avatar_url.current.value)
            }
            className="w-1/5 p-2 mx-auto text-xs font-bold bg-blue-500 rounded-full sm:text-md flexMid hover:bg-blue-600 "
          >
            Modifier l'avatar
          </button>
        </form>
        <p className={`mt-2 text-red-500 text-md`}>{errorFormAvatar}</p>
        <div className="flex items-center my-2 gap-x-3">
          <LuMail className="mr-1 " /> <p>Mail </p> :{" "}
          <p>{currentUserDatas.email}</p>
        </div>
        <div className="flex items-center my-2 gap-x-3">
          <LuCalendarDays className="mr-1 " /> <p>Inscription </p> :{" "}
          <p>{dateResgiter}</p>
        </div>
        {/* formulaire de modification de la biographie */}
        {/* en 2 ways binding pour la modifier si elle existe */}
        <form
          className="flex flex-col mt-4 gap-x-4"
          onSubmit={handleFormBiography}
        >
          <textarea
            type="text"
            // value={currentUserDatas.avatar_url}
            placeholder="Un petit de vous en 150 caractères max !"
            className="w-full h-24 p-2 text-white rounded-md bg-neutral-800"
            value={currentUserDatas.biography}
            onChange={(e) =>
              setUser({ ...currentUserDatas, biography: e.target.value })
            }
          ></textarea>

          <button className="px-4 py-2 mx-auto my-10 text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600 ">
            Valider ma nouvelle présentation
          </button>
        </form>
        <p className={`mt-2 text-red-500 text-md`}>{errorFormBiography}</p>
        {currentUserDatas.users_followed.length <= 1 && (
          <p className="mt-4 text-center text-md">
            Vous n'avez pas encore de favoris
          </p>
        )}
        {currentUserDatas.users_followed.length > 1 && (
          <div className="flex flex-col">
            <div className="flex items-center my-2 gap-x-3">
              <GoHeart className="mr-1" />
              Mes Favoris :
            </div>
            <ul className="flex flex-col ml-8 gap-y-2">
              {currentUserDatas.users_followed.map((followed, index) => (
                <NavLink key={index} to={`/user/${followed}`}>
                  {" "}
                  - {followed}{" "}
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
