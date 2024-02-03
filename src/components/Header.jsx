// barre de menu à gauche de la page
// complete si largeur écran > 1280px
// seulement icones si largeur 640px < écran < 1280px
//  sous les 640px, menu en pied de page avec le composant Footer
import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { FaHashtag } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
// import { SlLogout } from "react-icons/sl";<SlLogout />  //pour logout, au cas où !
import { FaFeather } from "react-icons/fa";
import { createPortal } from "react-dom";
import NavlinkHeader from "./toolsComponents/NavlinkHeader";
import { useModalsStore } from "../stores/useModalsStore";
import ModalFormPost from "./ModalFormPost";
import ModalConnection from "./ModalConnection";
import ModalRegister from "./ModalRegister";

export default function Header() {
  const { modalPost, setModalPost } = useModalsStore();const {
    modalRegister,
    setModalRegister,
    modalConnection,
    setModalConnection,
  } = useModalsStore();

  return (
    <div className="fixed pl-4 flex flex-col items-center xl:items-start justify-between h-screen max-h-[500px] gap-y-8">
      <NavlinkHeader to="/" icon={<LuHome />} text={"Accueil"} />
      <NavlinkHeader to="/hashtags" icon={<FaHashtag />} text={"HashTags"} />
      {/* <NavlinkHeader to="/favoris" icon={<GoHeart />} text={"Favoris"} />    si connecté*/} 
      {/* <NavlinkHeader to="/profil" icon={<FaRegUser />} text={"Profil"} />    si connecté*/}
      {/* bouton de connection */}
      <button
        className={`flex text-4xl items-center justify-center xl:justify-start xl:text-2xl gap-x-8 font-semibold`}
        onClick={() => setModalConnection(!modalConnection)}
      
      >
        <div className="w-9 h-9">
          <SlLogin />
        </div>
        <span className="hidden xl:block">Connexion</span>
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
