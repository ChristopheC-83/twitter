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
  const {
    currentUser,
    currentUserDatas,
    setCurrentUserDatas,
    loading,
    getCurrentUserDatas,
    logOut,
  } = useContext(UserContext);
  const [dateRegister, setDateRegister] = useState("");
  const avatarUrlRef = useRef("");
  const [errorFormAvatar, setErrorFormAvatar] = useState("");
  const [errorFormBiography, setErrorFormBiography] = useState("");

  // fonction dans un useEffect pour formater la date d'inscription et eviter une erreur
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

  // pour modifier un avatar utilisateur
  async function handleFormAvatar(e) {
    e.preventDefault();
    // vérification de l'URL du nouvel avatar
    const newAvatarUrl = avatarUrlRef.current.value.trim();
    if (newAvatarUrl === "") {
      setErrorFormAvatar(
        "Vous devez renseigner une URL si vous souhaitez modifier votre avatar !"
      );
      setTimeout(() => {
        setErrorFormAvatar("");
      }, 3000);
      return;
    }
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/;
    if (!urlRegex.test(newAvatarUrl)) {
      setErrorFormAvatar("L'URL que vous avez entrée n'est pas valide !");
      setTimeout(() => {
        setErrorFormAvatar("");
      }, 3000);
      return;
    }
    // MAJ avatar par PATCH dans Realtime Database
    try {
      const updateResponse = await fetch(
        `https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}.json`,
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

      setCurrentUserDatas((prevData) => ({
        ...prevData,
        avatar_url: newAvatarUrl,
      }));
      // MAJ dans le localstorage
      const currentUserDataCopy = JSON.parse(
        sessionStorage.getItem("currentUserDatas")
      );
      currentUserDataCopy.avatar_url = newAvatarUrl;
      sessionStorage.setItem(
        "currentUserDatas",
        JSON.stringify(currentUserDataCopy)
      );

      toast.success("Avatar URL updated successfully");
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Echec du changement d'avatar");
    }
  }
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
        toast.error("Une erreur s'est produite lors de la suppression de votre compte :", error.message);
      }
    }
  }
  

  
  

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col w-full p-4 border-b rounded shadow-md sm:p-6 md:p-8 border-neutral-500 bg-neutral-900">
      <div className="flex flex-col">
        <div className="w-12 h-12 p-2 ml-auto text-2xl text-white bg-red-800 border-2 border-white rounded-full cursor-pointer flexMid">
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
        <form className="flex gap-x-4" onSubmit={handleFormAvatar}>
          <input
            type="text"
            ref={avatarUrlRef}
            placeholder="URL de votre nouvel avatar"
            className="w-4/5 p-2 text-white rounded-md bg-neutral-800"
          />
          <button
            type="submit"
            className="w-1/5 p-2 mx-auto text-xs font-bold bg-blue-500 rounded-full sm:text-md flexMid hover:bg-blue-600"
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
          <p>{dateRegister}</p>
        </div>
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
