// composant qui affiche 1 commentaire sous un tweet

import { useState } from "react";
import { Link } from "react-router-dom";
import scrollToTop from "../../../../utils/scrollToTop";

export default function CommentTweet({ comment }) {
  
  // Pour afficher la date de manière plus lisible
  const [dateModif, setDateModif] = useState(
    new Date(parseInt(comment.date, 10)).toLocaleDateString("fr-FR", {
      //   weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      //   hour: "numeric",
      //   minute: "numeric",
    })
  );

  return (
    <div className="flex flex-col w-full px-4 py-2 border-t border-b rounded shadow-md sm:px-6 md:px-8 border-neutral-500">
      <div className="flex items-center justify-between w-full">
        <div>
          <span className="font-bold">
            <Link to={`/user/${comment.author_id_comment}`} onClick={scrollToTop}>
              {comment.author_comment}
            </Link>
          </span>
          {comment.date &&
          <span className="ml-4 font-thin text-neutral-500">
            le {dateModif}
          </span>}
        </div>
      </div>
        <div className="py-4">{comment.text_comment}</div>
    </div>
  );
}