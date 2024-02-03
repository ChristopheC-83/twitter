// import { useModalsStore } from "../stores/useModalsStore";
import { useRef, useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { UserContext } from "../context/userContext";
import { useModalsStore } from "../stores/useModalsStore";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

export default function ModalRegister({ closeModal }) {
  const { signUp } = useContext(UserContext);
  const {
    modalRegister,
    setModalRegister,
    modalConnection,
    setModalConnection,
  } = useModalsStore();
  const [validation, setValidation] = useState("");

  const login = useRef("");
  const email = useRef("");
  const password = useRef("");
  const passwordVerification = useRef("");
  const formRegister = useRef("");

  const listPseudo = ["toto", "tata", "titi", "tutu"]; //à recup avec appel api
  const listEmail = [""]; //à recup avec appel api

  // le formulaire est il rempli avec des données cohérentes ?
  function validationFormDatas() {
    if (login.current.value === "") {
      setValidation("Veuillez renseigner un pseudo.");
      return;
    }
    // le login exite déjà ?
    if (listPseudo.includes(login.current.value)) {
      setValidation(
        "Ce pseudo est déjà utilisé. Veuillez en choisir un autre."
      );
      return;
    }
    if (email.current.value === "") {
      setValidation("Veuillez renseigner un email.");
      return;
    }
    // if (listEmail.includes(email.current.value)) {
    //   setValidation(
    //     "Cet email est déjà utilisé. Veuillez en choisir un autre."
    //   );
    //   return;
    // }
    if (password.current.value.length < 6) {
      setValidation("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password.current.value !== passwordVerification.current.value) {
      setValidation("Les mots de passe ne correspondent pas.");
      return;
    }
  }

  // inscription après validation des données
  const handleFormRegister = async (e) => {
    e.preventDefault();
    validationFormDatas();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      // L'utilisateur nouvellement créé
      const user = userCredential.user;
      console.log("Utilisateur enregistré :", user);
      formRegister.current.reset();
      setValidation("");
      setModalRegister(false)
      toast.success("Inscription réussie ! Vous êtes connecté.");
    } catch (error) {
      console.dir(error)
      if (error.code === "auth/email-already-in-use") {
        toast.error("Cet email est déjà utilisé. Veuillez en choisir un autre.");
        return
      }
      if (error.code === "auth/invalid-email") {
        toast.error("Email invalide.");
        return
      }
      toast.error("Erreur d'inscription, veuillez réessayer.");
    
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 pt-12 bg-neutral-800/70 midFlex text-neutral-50"
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
          Inscrivez-vous !
        </h2>
        <form
          ref={formRegister}
        >
          <input
            type="text"
            placeholder="Votre pseudo"
            // id="login"
            ref={login}
            // name="login"
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />

          <input
            type="email"
            placeholder="Votre email"
            // name="email"
            ref={email}
            // id="email".current.value
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />
          <input
            type="password"
            placeholder="Votre mot de passe (6 caractères minimum)"
            // name="password"
            ref={password}
            // id="password"
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />
          <input
            type="password"
            placeholder="Validez votre mot de passe"
            // name="passwordVerification"
            ref={passwordVerification}
            // id="passwordVerification"
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />
          <p className="text-red-600 font-semithin text-md">
            {validation && validation}
          </p>
          <button
            onClick={handleFormRegister}
            className="px-4 py-2 mx-auto mt-6 text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600 "
          >
            Je m'inscris.
          </button>
        </form>
      </div>
    </div>
  );
}
