import { NavLink, Link } from "react-router-dom";
import { dateReadableLong } from "../../../utils/readDate";
import { ImBubble2 } from "react-icons/im";
import { FaRegTrashAlt, FaRetweet } from "react-icons/fa";
import { deleteTwitFunction } from "../../../utils/twitsFunctions";
import scrollToTop from "../../../utils/scrollToTop";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

export default function ShowTwit({ twit, retwit }) {
  const { currentUserDatas } = useContext(UserContext);

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
          <span className="text-sm text-gray-500">
            {dateReadableLong(twit.date)}
          </span>
        </div>
      </div>
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
