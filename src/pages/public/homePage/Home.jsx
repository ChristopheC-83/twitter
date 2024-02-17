//  page d'accueil de l'utilisateur connecté ou pas

import { useContext, useEffect, useState } from "react";
import { useTwitsStore } from "../../../stores/useTwitsStore";

import { toast } from "sonner";
import { FIREBASE_URL } from "../../../firebase-config";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import MainTwit from "../../commonsComponents/MainTwit";
import { UserContext } from "../../../context/userContext";

export default function Home() {
  const { twits, setTwits } = useTwitsStore();

  const { loading, setLoading } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [noContent, setNoContent] = useState(false);

  // récupération de tous les twits
  async function fetchTwits() {
    try {
      // FIREBASE_URL stockée dans un fichier .env.local
      const response = await fetch(FIREBASE_URL + "posts.json");

      if (!response.ok) {
        throw new Error("Une erreur est survenue !");
      }

      const data = await response.json();
      setLoading(false);

      // Vérifier si la réponse est vide
      if (data === null) {
        // Aucun twit disponible, afficher un message approprié
        console.log("Aucun twit disponible pour le moment.");

        return setNoContent(true);
      } else {
        console.log(data);
        const tweetsArray = Object.entries(data).map(([id, twit]) => ({
          id,
          ...twit,
        }));
      }
      setTwits(tweetsArray);
    } catch (error) {
      setNoContent(false);
      setError(error);
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  }
  // contenu contidionnel dans content
 

  useEffect(() => {
    fetchTwits();
  }, [twits]);
  

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <div className="pt-24 text-center">Une erreur est survenue !</div>;
  }
  if (noContent) {
    return (
      <div className="pt-24 text-xl text-center gtext-white">
        Aucun twit pour le moment.
      </div>
    );
  }
  if (!loading && !error && twits.length != 0) {
    return (
      <div className="flex flex-col-reverse flex-grow text-xl">
        {twits.map((twit, index) => (
          <MainTwit key={index} twit={twit} />
        ))}
      </div>
    );
  }
}
