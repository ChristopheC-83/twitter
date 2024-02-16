// composant qui affiche 1 commentaire sous un tweet
//  avec l'auteur du commentaire (qui est un lien vers sa page) et la date d'emission du commentaire

import { Link } from "react-router-dom";
import scrollToTop from "../../../../utils/scrollToTop";
import { dateReadableShort } from "../../../../utils/readDate";

export default function CommentTweet({ comment }) {
  return (
    <div className="flex items-center border-t border-b">
      <div className="flex flex-col w-full px-4 py-2 rounded shadow-md sm:px-6 md:px-8 border-neutral-500">
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="font-bold">
              <Link
                to={`/user/${comment.author_id_comment}`}
                onClick={scrollToTop}
              >
                {comment.author_comment}
              </Link>
            </span>
            {comment.date && (
              <span className="ml-4 font-thin text-neutral-500">
                le {dateReadableShort(comment.date)}
              </span>
            )}
          </div>
          <div className="flex items-center h-full"></div>
        </div>
        <div className="py-4">{comment.text_comment}</div>
      </div>
    </div>
  );
}
