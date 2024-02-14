//  pour la connexion, propose l'enregistrement su ce n'est pas déjà fait

import { useEffect, useRef, useState, useContext } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useModalsStore } from "../../../stores/useModalsStore";
import { createPortal } from "react-dom";
import ModalRegister from "./ModalRegister";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { UserContext } from "../../../context/userContext";

export default function ModalConnection({ closeModal }) {
  // gestion currentUser du context

  const { currentUser, setCurrentUser,setLoading, setCurrentUserDatas, getCurrentUserDatas } =
    useContext(UserContext);

  // gestion des modales
  const { modalRegister, setModalRegister, setModalConnection } =
    useModalsStore();
  function switchModals() {
    setModalConnection(true);
    setModalRegister(true);
    setModalConnectionHidden(true);
  }
  const [modalConnectionHidden, setModalConnectionHidden] = useState(false);

  // gestion messages d'ezrreurs pour formulaire
  const [validation, setValidation] = useState("");

  // ref pour formulaire
  const login = useRef("");
  const email = useRef("");
  const password = useRef("");

   // connection utilisateur utilisée
  async function loginUser(e) {
    e.preventDefault();
    setValidation("");

    if (email.current.value === "" || password.current.value === "") {
      setValidation("Veuillez remplir tous les champs !");
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      const user = userCredential.user;
      console.log("currentUser : ",user);

      // Appeler getCurrentUserDatas avec l'UID de l'utilisateur
      const userData = await getCurrentUserDatas(user.uid);
      sessionStorage.setItem('currentUserDatas', JSON.stringify(userData));
      setCurrentUserDatas(userData);
      
      closeModal();
      toast.success("Vous êtes connecté !");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setValidation(
          "Connexion impossible : vérifiez votre email et votre mot de passe"
        );
        toast.error(
          "Connexion impossible : vérifiez votre email et votre mot de passe"
        );
      } else {
        setValidation("Une erreur est survenue !");
        toast.error("Une erreur est survenue !");
      }
    }
  }



  return (
    <div
      className={`fixed inset-0 pt-12 z-20 bg-neutral-800/70 midFlex text-neutral-50
      ${modalConnectionHidden && "hidden"}
      `}
      onClick={closeModal}
    >
      <div
        className="relative w-11/12  max-w-[600px] px-4 md:px-10 py-8 mx-auto border-2 rounded-md  bg-neutral-900 border-neutral-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => closeModal()}
          className="absolute text-xl text-neutral-50 top-1 left-2"
        >
          X
        </button>
        <h2 className="mb-6 text-3xl font-semibold text-center">
          Connectez-vous !
        </h2>
        <form>
          <input
            type="mail"
            placeholder="Votre email"
            ref={email}
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />

          <input
            type="password"
            placeholder="Votre mot de passe"
            ref={password}
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />
          <button
            onClick={loginUser}
            className="px-4 py-2 mx-auto my-10 text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600 "
          >
            Je me connecte
          </button>
        </form>
        <button
          onClick={() => switchModals()}
          className="px-4 py-2 mx-auto text-xl font-bold bg-green-500 rounded-full w-fit flexMid hover:bg-green-600 "
        >
          Je n'ai pas de compte, je m'inscris !
        </button>
      </div>
      {modalRegister &&
        createPortal(
          <ModalRegister closeModal={() => setModalRegister(false)} />,
          document.body
        )}
    </div>
  );
}
