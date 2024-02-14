// barre de menu à gauche de la page
// complete si largeur écran > 1280px
// seulement icones si largeur 640px < écran < 1280px
// sous les 640px, menu en pied de page avec le composant Footer

import { GoHeart } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { FaFeather } from "react-icons/fa";

import { createPortal } from "react-dom";
import { useState, useContext } from "react";
import NavlinkHeader from "./linksComponents/NavlinkHeader";
import { useModalsStore} from "../../stores/useModalsStore";
import ModalFormPost from "../../pages/commonsComponents/modals/ModalFormPost";
import ModalConnection from "../../pages/commonsComponents/modals/ModalConnection";
import ModalRegister from "../../pages/commonsComponents/modals/ModalRegister";
import { auth } from "../../firebase-config";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, loading, setLoading, logOut } = useContext(UserContext);

  const { modalPost, setModalPost } = useModalsStore();
  const {
    modalRegister,
    setModalRegister,
    modalConnection,
    setModalConnection,
  } = useModalsStore();

  function logOutFunc() {
    navigate("/");
    logOut();
    
  }

  return (
    <div
      className={`fixed pl-4 flex flex-col items-center xl:items-start justify-start h-screen max-h-[500px] gap-y-8 ${currentUser && "justify-between"}`}
    >
      <NavlinkHeader to="/" icon={<LuHome />} text={"Accueil"} />

      
      {/* bouton de connection */}
      {currentUser ? (
        <>
          <NavlinkHeader to="/favoris" icon={<GoHeart />} text={"Favoris"} />
          <NavlinkHeader to="/profil" icon={<FaRegUser />} text={"Profil"} />
          <button
            className={`flex text-4xl items-start justify-center xl:justify-start xl:text-2xl gap-x-8 font-semibold`}
            onClick={() => logOutFunc()}
          >
            <div className="w-9 h-9 flexMid">
              <SlLogout className="rotate-180" />
            </div>
            <span className="hidden xl:block">Déconnexion</span>
          </button>
           {/* bouton pour écrire un post */}
      <button
        className="px-4 py-4 mx-auto text-xl font-bold bg-blue-500 rounded-full xl:w-full flexMid hover:bg-blue-600 xl:mx-auto xl:py-2"
        onClick={() => setModalPost(!modalPost)}
      >
        <span className="hidden mr-4 xl:block">Ecrire</span>
        <span className="text-4xl">
          <FaFeather />
        </span>
      </button>
        </>
      ) : (
        <button
          className={`flex text-4xl items-start justify-center xl:justify-start xl:text-2xl gap-x-8 font-semibold`}
          onClick={() => setModalConnection(!modalConnection)}
        >
          <div className="w-9 h-9 flexMid">
            <SlLogin />
          </div>
          <span className="hidden xl:block">Connexion</span>
        </button>
      )}

     

      {modalPost &&
        createPortal(
          <ModalFormPost closeModal={() => setModalPost(false)} />,
          document.body
        )}
      {modalConnection &&
        createPortal(
          <ModalConnection closeModal={() => setModalConnection(false)} />,
          document.body
        )}
    </div>
  );
}
