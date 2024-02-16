// Encart d'un twit dans une liste
// homePage ou allTwitsOfOneUser

import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useTwitsStore } from "../../stores/useTwitsStore";
import { ImBubble2 } from "react-icons/im";
import { FaRetweet } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { FIREBASE_URL } from "../../firebase-config";
import { dateReadableLong } from "../../utils/readDate";
import scrollToTop from "../../utils/scrollToTop";

export default function Twit({ twit }) {
  const navigate = useNavigate();
  const { currentUser, currentUserDatas } = useContext(UserContext);
  const { twits, deleteTwit, addTwit } = useTwitsStore();

  // Utilise useState directement pour initialiser la date
  const dateModif = dateReadableLong(twit.date);

  //Fonctions
  function deleteTwitFunction(id_twit) {
    console.log("Suppression du twit :", id_twit);
    try {
      // Supprimer le twit de la base de données en temps réel
      fetch(`${FIREBASE_URL}posts/${id_twit}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Twit supprimé avec succès !");
      console.log("Twit supprimé avec succès :", id_twit);
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la suppression du twit :",
        error
      );
    }
  }
  // useEffect(() => {
  //   console.log(currentUserDatas);
  //   console.log(twit)
  // }, []);

  async function retwit(e) {
    // console.log("Retwit du twit :", twit.id);
    
    // console.log("currentUserDatas : ",currentUserDatas);
    // console.log("twit", twit)
    try {
      const newPost = {
        text: twit.text,
        img: twit.img,
        author: currentUserDatas.login,
        id_author: currentUserDatas.uid,
        original_author: twit.original_author,
        id_original_author: twit.id_original_author,
        date: Date.now(),
        original_date: twit.original_date,
        comments: [{
          author_comment: currentUserDatas.login,
          author_id_comment: currentUserDatas.uid,
          date: Date.now(),
          text_comment: "Sois le premier à commenter ce post !",
        },],
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
      navigate(`/`);
      scrollToTop();

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col w-full p-4 border-t border-b rounded shadow-md sm:p-6 md:p-8 border-neutral-500 bg-neutral-900">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="font-bold">
              <Link to={`/user/${twit.id_author}`} onClick={scrollToTop}>
                {twit.author}
              </Link>
            </span>
          </div>
          <span className="text-sm text-gray-500">{dateModif}</span>
        </div>
      </div>
      <NavLink to={`/post/${twit.id}`}>
        <div className="mb-8">{twit.text}</div>
        {twit.img && (
          <img className="mx-auto w-8/10" src={twit.img} alt={twit.author} />
        )}
      </NavLink>

      <div className="flex mt-4 justify-evenly">
        <div className="flex items-center gap-2 text-neutral-500 hover:text-neutral-50 hover:cursor-pointer">
          <ImBubble2 />
          <span>{twit.comments.length}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500 hover:text-neutral-50 hover:cursor-pointer">
          <FaRetweet
            onClick={() => retwit(twit.id)}
            className="cursor-pointer"
          />
        </div>
        {currentUserDatas && twit.author === currentUserDatas.login && (
          <div className="flex items-center gap-2 text-neutral-500 hover:text-neutral-50 hover:cursor-pointer">
            <FaRegTrashAlt
              onClick={() => deleteTwitFunction(twit.id)}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
