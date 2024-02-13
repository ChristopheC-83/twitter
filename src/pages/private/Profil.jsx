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
  const { currentUser, currentUserDatas, setCurrentUserDatas, loading, getCurrentUserDatas, logOut } = useContext(UserContext);
  const [dateRegister, setDateRegister] = useState("");
  const avatarUrlRef = useRef("");
  const [errorFormAvatar, setErrorFormAvatar] = useState("");
  const [errorFormBiography, setErrorFormBiography] = useState("");

  useEffect(() => {
    if (currentUserDatas && currentUserDatas.register_since) {
      const formattedDate = new Date(parseInt(currentUserDatas.register_since, 10)).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDateRegister(formattedDate);
    }
  }, [currentUserDatas]);

  async function handleFormAvatar(e) {
    e.preventDefault();

    const newAvatarUrl = avatarUrlRef.current.value.trim();

    if (newAvatarUrl === "") {
      setErrorFormAvatar("Vous devez renseigner une URL si vous souhaitez modifier votre avatar !");
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

    try {
      const updateResponse = await fetch(`https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar_url: newAvatarUrl }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update user avatar URL");
      }

      setCurrentUserDatas((prevData) => ({
        ...prevData,
        avatar_url: newAvatarUrl,
      }));

      const currentUserDataCopy = JSON.parse(sessionStorage.getItem("currentUserDatas"));
      currentUserDataCopy.avatar_url = newAvatarUrl;
      sessionStorage.setItem("currentUserDatas", JSON.stringify(currentUserDataCopy));

      toast.success("Avatar URL updated successfully");
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred:", error);
    }
  }

  function handleFormBiography(e) {
    e.preventDefault();

    if (currentUserDatas.biography.trim() === "") {
      setErrorFormBiography("Ne soyez pas timide ! Racontez-nous qui vous êtes en quelques mots !");
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000);
      return;
    }

    if (currentUserDatas.biography.length > 150) {
      setErrorFormBiography("150 caractères max, on ne raconte pas TOUTE sa vie !!!");
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000);
      return;
    }
  }

  function deleteAccount() {
    const deleteConfirmed = window.confirm("Etes-vous sûr de vouloir supprimer votre compte ?");
    if (deleteConfirmed) {
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
        <img src={currentUserDatas.avatar_url} alt="avatar" className="rounded-full max-w-[300px] mx-auto mb-6" />
        <h2 className="mx-auto mb-4 text-2xl font-bold text-center sm:text-3xl">{currentUserDatas.login}</h2>
        <form className="flex gap-x-4" onSubmit={handleFormAvatar}>
          <input type="text" ref={avatarUrlRef} placeholder="URL de votre nouvel avatar" className="w-4/5 p-2 text-white rounded-md bg-neutral-800" />
          <button type="submit" className="w-1/5 p-2 mx-auto text-xs font-bold bg-blue-500 rounded-full sm:text-md flexMid hover:bg-blue-600">Modifier l'avatar</button>
        </form>
        <p className={`mt-2 text-red-500 text-md`}>{errorFormAvatar}</p>
        <div className="flex items-center my-2 gap-x-3">
          <LuMail className="mr-1 " /> <p>Mail </p> : <p>{currentUserDatas.email}</p>
        </div>
        <div className="flex items-center my-2 gap-x-3">
          <LuCalendarDays className="mr-1 " /> <p>Inscription </p> : <p>{dateRegister}</p>
        </div>
        <form className="flex flex-col mt-4 gap-x-4" onSubmit={handleFormBiography}>
          <textarea type="text" placeholder="Un petit de vous en 150 caractères max !" className="w-full h-24 p-2 text-white rounded-md bg-neutral-800" value={currentUserDatas.biography} onChange={(e) => setCurrentUserDatas({ ...currentUserDatas, biography: e.target.value })}></textarea>
          <button type="submit" className="px-4 py-2 mx-auto my-10 text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600">Valider ma nouvelle présentation</button>
        </form>
        <p className={`mt-2 text-red-500 text-md`}>{errorFormBiography}</p>
        {currentUserDatas.users_followed.length <= 1 && (
          <p className="mt-4 text-center text-md">Vous n'avez pas encore de favoris</p>
        )}
        {currentUserDatas.users_followed.length > 1 && (
          <div className="flex flex-col">
            <div className="flex items-center my-2 gap-x-3">
              <GoHeart className="mr-1" />
              Mes Favoris :
            </div>
            <ul className="flex flex-col ml-8 gap-y-2">
              {currentUserDatas.users_followed.map((followed, index) => (
                <NavLink key={index} to={`/user/${followed}`}> - {followed} </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}