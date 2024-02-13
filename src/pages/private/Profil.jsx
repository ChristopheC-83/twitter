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
  const { currentUser, currentUserDatas, loading } = useContext(UserContext);

  // ref pour formulaire
  //  le formaulaire bi
  const avatar_url = useRef("");

  //   messages d'erreur

  const [errorFormAvatar, setErrorFormAvatar] = useState("");
  const [errorFormBiography, setErrorFormBiography] = useState("");

  //   Fonctions

  function handleFormAvatar(e) {
    e.preventDefault();

    // Vérification si l'URL est vide
    if (avatar_url.current.value.trim() === "") {
      setErrorFormAvatar(
        "Vous devez renseigner une URL si vous souhaitez modifier votre avatar !"
      );
      setTimeout(() => {
        setErrorFormAvatar("");
      }, 3000); // Augmentation de la durée à 5 secondes
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

  // sécurité
  if (!currentUser) {
    navigate("/");
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col w-full p-4 border-b rounded shadow-md sm:p-6 md:p-8 border-neutral-500 bg-neutral-900">
      {currentUser.uid}
      <br />
      {currentUserDatas.uid}
    </div>
  );
}
