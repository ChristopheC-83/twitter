//  barre de menu si écran < 640px de large

import { GoHeart } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { FaHashtag } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { FaFeather } from "react-icons/fa";

import { createPortal } from "react-dom";
import { useState, useContext } from "react";
import NavlinkFooter from "../toolsComponents/NavLinkFooter";
import { useModalsStore } from "../../stores/useModalsStore";
import ModalFormPost from "../modals/ModalFormPost";
import ModalConnection from "../modals/ModalConnection";
import ModalRegister from "../modals/ModalRegister";
import { auth } from "../../firebase-config";
import { UserContext } from "../../context/userContext";

export default function Footer() {
  const { currentUser, loading, setLoading, logOut } = useContext(UserContext);

  const { modalPost, setModalPost } = useModalsStore();
  const {
    modalRegister,
    setModalRegister,
    modalConnection,
    setModalConnection,
  } = useModalsStore();

  console.log(currentUser);

  return (
    <footer>
      <div className="flex items-center h-24 justify-evenly">
        <NavlinkFooter to="/" icon={<LuHome />} text={"Accueil"} />
        <NavlinkFooter to="/hashtags" icon={<FaHashtag />} text={"Hashtags"} />
        {currentUser && (
          <NavlinkFooter to="/favoris" icon={<GoHeart />} text={"Favoris"} />
        )}
        {currentUser && (
          <NavlinkFooter to="/profil" icon={<FaRegUser />} text={"Profil"} />
        )}
        {currentUser ? (
          <button
            className={`flex text-4xl items-center justify-center xl:justify-start xl:text-3xl gap-x-8 font-semibold`}
            onClick={() => logOut()}
          >
            <div className="w-9 h-9 flexMid">
              <SlLogout className="rotate-180" />
            </div>
          </button>
        ) : (
          <button
            className={`flex text-4xl items-center justify-center xl:justify-start xl:text-3xl gap-x-8 font-semibold`}
            onClick={() => setModalConnection(!modalConnection)}
          >
            <div className="w-9 h-9">
              <SlLogin />
            </div>
          </button>
        )}
      </div>
      <button
        onClick={() => setModalPost(!modalPost)}
        className="absolute p-4 text-3xl font-bold bg-blue-500  rounded-full top-[-80px] right-[10px] flexMid hover:bg-blue-600 xl:mx-auto"
      >
        <span className="text-4xl">
          <FaFeather />
        </span>
      </button>

      {modalPost &&
        createPortal(
          <ModalFormPost closeModal={() => setModalPost(false)} />,
          document.body
        )}
    </footer>
  );
}
