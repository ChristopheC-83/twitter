import { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ImBubble2 } from "react-icons/im";
import { FaRetweet } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import scrollToTop from "../../utils/scrollToTop";
import { UserContext } from "../../context/userContext";
import { toast } from "sonner";

import { useTwitsStore } from "../../stores/useTwitsStore";
import { FIREBASE_URL } from "../../firebase-config";

export default function ReTwit({ twit }) {
  const navigate = useNavigate();
  const { currentUser, currentUserDatas } = useContext(UserContext);

  const { twits, deleteTwit, addTwit } = useTwitsStore();

  // affichage de la date de manière plus lisible
  const [dateModif, setDateModif] = useState(
    new Date(parseInt(twit.date, 10)).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  );
  const [dateOriginalModif, setDateOriginalModif] = useState(
    new Date(parseInt(twit.original_date, 10)).toLocaleDateString("fr-FR", {
      //   weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  //   functions
  async function retwit(e) {
    console.log("Retwit du twit :", twit.id);

    console.log("currentUserDatas : ", currentUserDatas);
    console.log("twit", twit);
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
        comments: ["Sois le premier à commenter ce post !"],
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
    } catch (error) {
      toast.error(error.message);
    }
  }

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



  return (
    <div className="flex flex-col w-full p-4 border-b rounded shadow-md sm:p-6 md:p-8 border-neutral-500 bg-neutral-900">
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

      <div className="relative p-4 mt-4 border border-neutral-500">
        <div className="absolute top-[-16px] bg-neutral-900 px-2">
          <span className="font-semibold">
            <Link to={`/user/${twit.id_original_author}`} onClick={scrollToTop}>
              <span className="font-normal text-neutral-500">🔁from</span>{" "}
              {twit.original_author}
            </Link>
          </span>
        </div>
        <span className="absolute text-sm text-gray-500 top-[-13px] right-2 bg-neutral-900 px-2">
          {dateOriginalModif}
        </span>
        <NavLink to={`/post/${twit.id}`}>
          <div className="mb-8">{twit.text}</div>
          {twit.img && (
            <img className="mx-auto rounded w-8/10" src={twit.img} alt={twit.author} />
          )}
        </NavLink>
      </div>
      <div className="flex mt-6 justify-evenly">
        <div className="flex items-center gap-2 text-neutral-500">
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
