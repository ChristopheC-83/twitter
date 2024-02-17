// Propose la créationd d'un twit

import { useRef, useContext, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
// import { useModalsStore } from "../stores/useModalsStore";
import { FIREBASE_URL } from "../../../firebase-config";
import { useTwitsStore } from "../../../stores/useTwitsStore";
import scrollToTop from "../../../utils/scrollToTop";

export default function ModalFormPost({ closeModal }) {
  const { currentUser, currentUserDatas } = useContext(UserContext);
  const navigate = useNavigate();
  const { twits, setTwits, addTwit, setMaj } = useTwitsStore();

  const [validation, setValidation] = useState("");

  // refs
  const text = useRef("");
  const img = useRef("");
  const author = useRef("");
  const date = useRef("");

  // functions

  function validationFormDatas() {
    setValidation("");
    // email vide ?
    if (
      (text.current.value.trim() === "") &
      (img.current.value.trim() === "")
    ) {
      setValidation("Un post vide ? Vraiment ?");
      return false;
    }
    if (text.current.value.length > 250) {
      setValidation(
        `Ton post est trop long ! 250 caractères maximum ! Pas ${text.current.value.length} !`
      );
      return false;
    }

    setValidation("");
    return true;
  }

  const createPost = async (e) => {
    e.preventDefault();
    // longueur mdp, cohérence des2 mdp...
    if (validationFormDatas()) {
      try {
        const newPost = {
          text: text.current.value,
          img: img.current.value,
          author: currentUserDatas.login,
          id_author: currentUserDatas.uid,
          original_author: currentUserDatas.login,
          id_original_author: currentUserDatas.uid,
          date: Date.now(),
          original_date: Date.now(),
          comments: [
            {
              author_comment: currentUserDatas.login,
              author_id_comment: currentUserDatas.uid,
              date: Date.now(),
              text_comment: "Sois le premier à commenter ce post !",
            },
          ],
        };

        const response = await fetch(FIREBASE_URL + "posts.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });

        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors de l'enregistrement du twit."
          );
        }

        // Ajoutez le nouveau twit localement dans le store Zustand
        addTwit(newPost);
        setMaj();
        // Fermez le modal et naviguez vers la page d'accueil
        closeModal();
        navigate(`/`);
        scrollToTop();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 pt-12 bg-neutral-800/70 midFlex text-neutral-50"
      onClick={closeModal}
    >
      <div
        className="relative w-11/12 max-w-[600px] px-6 md:px-10 py-8 mx-auto border-2 rounded-md  bg-neutral-900 border-neutral-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => closeModal()}
          className="absolute text-xl text-neutral-50 top-1 left-2"
        >
          X
        </button>
        <form>
          <p className="mb-4 text-2xl text-center">
            Salut <i>{currentUserDatas.login}</i>
          </p>
          <textarea
            className="w-full p-2 text-base resize-none md:text-lg sm:text-md h-72 font-semi-bold bg-neutral-900"
            placeholder="Dis nous tout ! (mais en 250 caractères maximum !)"
            ref={text}
            name="text"
          ></textarea>
          <input
            type="text"
            placeholder="Lien vers une image"
            id="img"
            ref={img}
            name="img"
            className="w-full p-4 rounded-lg bg-neutral-900 "
          />
          {/* <input
            type="hidden"
            name="author"
            ref={author}
            id="author"
            value={author === "" ? author : "kiki"}
          />
          <input
            type="hidden"
            name="date"
            ref={date}
            id="date"
            value={Date.now()}
          /> */}
          <p className="text-red-600 font-semithin text-md">
            {validation && validation}
          </p>
          <button
            onClick={createPost}
            className="px-4 py-2 ml-auto text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600 "
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
