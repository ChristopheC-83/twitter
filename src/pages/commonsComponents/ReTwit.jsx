// Encart d'un retwit dans une liste
// homePage ou allTwitsOfOneUser

import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useTwitsStore } from "../../stores/useTwitsStore";
import { FIREBASE_URL } from "../../firebase-config";
import { dateReadableShort, dateReadableLong } from "../../utils/readDate";
import scrollToTop from "../../utils/scrollToTop";
import { toast } from "sonner";

import { ImBubble2 } from "react-icons/im";
import { FaRetweet } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteTwitFunction } from "../../utils/twitsFunctions";

export default function ReTwit({ twit }) {
  const navigate = useNavigate();
  const { currentUserDatas } = useContext(UserContext);
  const { addTwit } = useTwitsStore();

  //   functions

  async function retwit() {
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
      navigate(`/`);
      scrollToTop();
    } catch (error) {
      toast.error(error.message);
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
          <span className="text-sm text-gray-500">
            {dateReadableLong(twit.date)}
          </span>
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
          {dateReadableShort(twit.original_date)}
        </span>
        <NavLink to={`/post/${twit.id}`}>
          <div className="mb-8">{twit.text}</div>
          {twit.img && (
            <img
              className="mx-auto rounded w-8/10"
              src={twit.img}
              alt={twit.author}
            />
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
