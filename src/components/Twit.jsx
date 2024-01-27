import { useState } from "react";
import { ImBubble2 } from "react-icons/im";
import { FaRetweet } from "react-icons/fa6";
// import { GoHeartFill } from "react-icons/go"; <GoHeartFill />
import { GoHeart } from "react-icons/go";
// import { FaBookmark } from "react-icons/fa6"; <FaBookmark /> 
import { FaRegBookmark } from "react-icons/fa6";

export default function Twit({ twit }) {
  // Utilise useState directement pour initialiser la date
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

  return (
    <div className="flex flex-col w-full p-8 border-t border-b rounded shadow-md border-neutral-500 bg-neutral-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">{twit.author}</span>
            <span className="text-sm text-gray-500">{dateModif}</span>
          </div>
        </div>
      </div>
      <div className="mb-8">{twit.text}</div>
      {twit.img && (
        <img className="mx-auto w-8/10" src={twit.img} alt={twit.author} />
      )}

      {twit.hashtags > 0 && (
        <div className="flex flex-wrap">
          {twit.hashtags.map((hashtag) => (
            <span key={twit.date} className="mr-2 text-blue-500 cursor-pointer">
              #{hashtag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        {/* <div className="flex items-center">
          <span className="mr-4">{twit.likes}</span>
          <span>{twit.comments.length}</span>
        </div> */}
        <div className="flex items-center gap-2 text-neutral-500">
          <ImBubble2 />
          <span>{twit.comments.length}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500">
          <FaRetweet />
          {/* ajouter le nombre de retweets */}
          <span>0</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500">
          <GoHeart />
          {/* pour les likes il faudrait plus un tableau contenant ceux qui aiment le twit */}
          {/* ainsi si user connecté et que son nom est dans le tableau, le coeur est plein */}
          {/*  */}
          <span className="mb-0.5">{twit.likes}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500">
          <FaRegBookmark  />
          {/* pour les enregistrés il faudrait plus un tableau contenant ceux qui ont enregistré */}
          {/* ainsi si user connecté et que son nom est dans le tableau, le bookmark est plein */}
          {/*  */}
          <span className="mb-0.5">{twit.likes}</span>
        </div>
      </div>
    </div>
  );
}
