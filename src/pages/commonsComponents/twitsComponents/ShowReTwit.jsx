import { NavLink, Link } from "react-router-dom";
import { dateReadableLong } from "../../../utils/readDate";
import { ImBubble2 } from "react-icons/im";
import { FaRegTrashAlt, FaRetweet } from "react-icons/fa";
import scrollToTop from "../../../utils/scrollToTop";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

export default function ShowReTwit({ twit, retwit, deleteTwitFunction }) {
  const { currentUserDatas } = useContext(UserContext);

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
          {dateReadableLong(twit.original_date)}
        </span>
        <NavLink to={`/post/${twit.id}`}>
          <div className="mb-8">{twit.text}</div>
          {twit.img && (
            <img
              className="min-w-full rounded"
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

        {currentUserDatas &&
        <div className="flex items-center gap-2 text-neutral-500 hover:text-neutral-50 hover:cursor-pointer">
          <FaRetweet
            onClick={() => retwit(twit.id)}
            className="cursor-pointer"
          />
        </div>}
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
