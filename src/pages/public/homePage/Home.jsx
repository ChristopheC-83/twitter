//  page d'accueil de l'utilisateur connecté ou pas

import { useEffect, useState } from "react";
import { useTwitsStore } from "../../../stores/useTwitsStore";

import { toast } from "sonner";
import { FIREBASE_URL } from "../../../firebase-config";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import MainTwit from "../../commonsComponents/MainTwit";

export default function Home() {
  const { twits, setTwits } = useTwitsStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    fetchTwits();
    console.log("MAJ Home");
  }, []);

  // contenu contidionnel dans content
  let content;

  if (loading) {
    content = <LoadingComponent />;
    return;
  }
  if (error) {
    content = (
      <div className="pt-24 text-center">Une erreur est survenue !</div>
    );
    return;
  }
  if (!loading && !error && twits.length === 0) {
    content = (
      <div className="pt-24 text-center">Aucun twit pour le moment.</div>
    );
    return;
  }
  if (!loading && !error && twits.length != 0) {
    content = twits.map((twit, index) =>
      <MainTwit key={index} twit={twit} />
    );
  }

  return (
    <div className="flex flex-col-reverse flex-grow text-xl">
      {content}
    </div>
  );
}
