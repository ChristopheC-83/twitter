// La liste des twits de l'utilisateur

import { useState, useEffect } from "react";
// import { useTwitsStore } from "../../../../stores/useTwitsStore";
import { FIREBASE_URL } from "../../../../firebase-config";
import { toast } from "sonner";
import LoadingComponent from "../../../commonsComponents/toolsComponents/LoadingComponent";
import Twit from "../../../commonsComponents/Twit";

export default function TwitsListOfUser({ user_id }) {
  const [twitsOfUser, setTwitsOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchUserTweets(idUser) {
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
      console.log(tweetsArray);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchUserTweets(user_id);
  }, []);

  if (loading) return <LoadingComponent />;
  if (error)
    return <div className="pt-24 text-center">Une erreur est survenue !</div>;
  if (!loading && !error) {
    return twitsOfUser.map((twit) => <Twit key={twit.date} twit={twit} />);
  }
}
