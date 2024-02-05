//  propose l'enregistrment d'un utilisateur sur le site

// import { useModalsStore } from "../stores/useModalsStore";
import { useRef, useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { UserContext } from "../../context/userContext";
import { useModalsStore } from "../../stores/useModalsStore";
import { toast } from "sonner";

export default function ModalRegister({ closeModal }) {
  const { signUp } = useContext(UserContext);
  const {
    modalRegister,
    setModalRegister,
    modalConnection,
    setModalConnection,
  } = useModalsStore();

  //  les States

  const [validation, setValidation] = useState("");
  const [loginsList, setLoginsList] = useState([]);

  //  use =REf pour formulaires
  const login = useRef("");
  const email = useRef("");
  const password = useRef("");
  const passwordVerification = useRef("");
  const formRegister = useRef("");

  // récupération des logins pour vérifier si le login est déjà utilisé
  async function getAllLogins() {
    try {
      const response = await fetch(
        "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );

      if (!response.ok) {
        // Gestion des erreurs
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs"
        );
        return [];
      }

      const data = await response.json();
      if (data) {
        setLoginsList(Object.values(data).map((user) => user.login));
      }
      console.log(loginsList);
      return loginsList;
    } catch (error) {
      console.error("Une erreur inattendue est survenue :", error);
      return [];
    }
  }
  useEffect(() => {
    getAllLogins();
  }, []);
  // le formulaire est il rempli avec des données cohérentes ?
  function validationFormDatas() {
    console.log(loginsList);
    setValidation("");
    if (login.current.value === "") {
      setValidation("Veuillez renseigner un pseudo.");
      return false;
    }
    if (loginsList.includes(login.current.value)) {
      setValidation(
        "Ce pseudo est déjà utilisé. Veuillez en choisir un autre."
      );
      return false;
    }
    if (email.current.value === "") {
      setValidation("Veuillez renseigner un email.");
      return false;
    }
    if (password.current.value.length < 6) {
      setValidation("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    if (password.current.value !== passwordVerification.current.value) {
      setValidation("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  }
  // insertion dans DB détaillées du user
  async function RegisterUserJson(userID) {
    const newUser = {
      id: userID,
      login: login.current.value,
      email: email.current.value,
      avatarURL:
        "https://mycloud.barpat.fun/public/assets/Images/bureautique/avatar_neutre.png",
      bio: "",
      personnalPage: "https://www.google.fr/",
      idSavedTwits: [""],
      idCaractersFollowed: [""],
    };

    console.log(newUser);

    // Add to firebase realtime
    const response = await fetch(
      "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    // Error
    if (!response.ok) {
      toast.error("Une erreur est intervenue dans la bdd");
      return;
    }
  }
  // inscription après validation des données
  const handleFormRegister = async (e) => {
    e.preventDefault();
    // longueur mdp, cohérence des2 mdp...
    if (validationFormDatas()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const userID = userCredential.user.uid; // recup nouvel ID

        // enregistrement dans db du user
        RegisterUserJson(userID);
        formRegister.current.reset();
        setValidation("");
        setModalRegister(false);
        toast.success("Inscription réussie ! Vous êtes connecté.");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setValidation(
            "Cet email est déjà utilisé. Veuillez en choisir un autre."
          );
        }
        if (error.code === "auth/invalid-email") {
          setValidation("Veuillez renseigner un email valide.");
        }
        console.dir(error);
      }
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
        <form ref={formRegister}>
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
