//  page d'accueil de l'utilisateur connecté ou pas

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Toaster, toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import Twit from "../../commonsComponents/Twit";
import { FIREBASE_URL } from "../../../firebase-config";
import { useTwitsStore } from "../../../stores/useTwitsStore";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";

export default function Home() {
  const { currentUser, currentUserDatas } = useContext(UserContext);
  const { twits, setTwits } = useTwitsStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(FIREBASE_URL+"posts.json");
  async function fetchTwits() {
    try {
      const response = await fetch(
        "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      );

      if (!response.ok) {
        throw new Error("Une erreur est survenue !");
      }

      const data = await response.json();
      setLoading(false);

      const tweetsArray = Object.entries(data).map(([id, twit]) => ({
        id,
        ...twit,
      }));

      setTwits(tweetsArray);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    console.log("twit");
    fetchTwits();
  }, []);

  return (
    <div className="flex flex-col-reverse flex-grow text-xl">
      <Toaster position="top-center" richColors expand={true} />

      {loading && <LoadingComponent />}

      {/* Erreur */}
      {error && <div>Une erreur est survenue !</div>}

      {/* Affichage des Twitts */}
      {!loading && !error &&
        twits.map((twit) => <Twit key={twit.date} twit={twit} />)}
    </div>
  );
}
