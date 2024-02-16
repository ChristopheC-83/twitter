// La liste des twits de l'utilisateur affichés de manière antéchronologique
// affichage différent entre twit et retwit

import { useState, useEffect } from "react";
// import { useTwitsStore } from "../../../../stores/useTwitsStore";
import { FIREBASE_URL } from "../../../../firebase-config";
import { toast } from "sonner";
import LoadingComponent from "../../../commonsComponents/toolsComponents/LoadingComponent";
import Twit from "../../../commonsComponents/Twit";
import ReTwit from "../../../commonsComponents/ReTwit";

export default function TwitsListOfUser({ user_id }) {
  const [twitsOfUser, setTwitsOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // récupère tous les twits puis filtre avec le nom de l'auteur

  async function fetchUserTweets() {
    try {
      const response = await fetch(FIREBASE_URL + "posts.json");

      if (!response.ok) {
        throw new Error("Une erreur est survenue !");
      }

      const data = await response.json();
      setLoading(false);

      const tweetsArray = Object.entries(data)
        .map(([id, twit]) => ({
          id,
          ...twit,
        }))
        // Filtrer les twits par id_author
        .filter((twit) => twit.id_author === user_id);

      setTwitsOfUser(tweetsArray);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchUserTweets();
  }, [user_id]);

  //  rendu conditionnel

  if (loading) return <LoadingComponent />;
  if (error)
    return <div className="pt-24 text-center">Une erreur est survenue !</div>;
  if (!loading && !error) {
    return twitsOfUser
      .slice()
      .reverse()
      .map((twit) =>
        twit.date === twit.original_date ? (
          <Twit key={twit.date} twit={twit} />
        ) : (
          <ReTwit key={twit.date} twit={twit} />
        )
      );
  }
}
