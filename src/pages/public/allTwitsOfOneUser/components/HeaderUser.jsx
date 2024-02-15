// L'encart de présentation de l'utilisateur

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dateReadableShort } from "../../../../utils/readDate";
import LoadingComponent from "../../../commonsComponents/toolsComponents/LoadingComponent";
import { LuCalendarDays, LuLink2, LuMail } from "react-icons/lu";

export default function HeaderUser({ user_id }) {
  // console.log("hederUser : ", user_id);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUser(user_id) {
    try {
      const response = await fetch(
        ` https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/users/${user_id}.json`
      );
      if (!response.ok) {
        throw new Error("On n'a pas truvé l'utilisateur !");
      }
      const user = await response.json();
      setLoading(false);
      setUser(user);
      console.log("user is", user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser(user_id);
  }, [user_id]);

  if (loading) return <LoadingComponent />;
  if (error)
    return <div className="pt-24 text-center">Une erreur est survenue !</div>;
  if (!loading && !error) {
    return (
      <div className="w-full h-[300px] border-b border-neutral-500 flex flex-col p-4 items-start">
      <div className="flex w-full mb-8 gap-x-4 font-md sm:font-lg">
        <div className="w-1/4 flexMid min-w-[120px]">
          <img
            src={user.avatar_url}
            alt="profil"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div className="w-3/4">
          <div className="flex items-center">
            <h2 className="py-4 mx-auto text-2xl font-bold text-center sm:text-3xl">
              {user.userName}
            </h2>
            {/* si c'est mon fil, je n'ai pas de bouton d'abonnement ... */}

            {/* si non abonné, je m'abonne */}
            {user &&
              user.userName !== user.userName &&
              !user.followed.includes(user.userName) && (
                <button
                  onClick={handleFormFollowing}
                  className="h-8 bg-blue-500 rounded-md w-28 text-neutral-50 "
                >
                  S'abonner
                </button>
              )}

            {/* si abonné, je me désabonne */}
            {user &&
              user.userName !== user.userName &&
              user.followed.includes(user.userName) && (
                <button
                  onClick={handleFormUnFollowing}
                  className="w-32 h-8 bg-blue-500 rounded-md text-neutral-50 "
                >
                  Se désabonner
                </button>
              )}
          </div>
          <div className="flex items-center gap-x-3">
            <LuCalendarDays className="mt-1 mr-1" /> : <p>{dateReadableShort(user.register_since)}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <LuMail className="mt-1 mr-1" /> : <p>{user.email}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <LuLink2 className="mt-1 mr-1" /> :{" "}
            <a href={user.personnalLink} className="text-blue-500">
              {user.personnalLink}
            </a>
          </div>
        </div>
      </div>
      <div className="font-thin text-md sm:text-lg text-neutral-300">
        {user.biography}
      </div>
    </div>
    );
  }
}
