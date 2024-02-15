// Pour visionner un twit en particulier avec ses commentaires en récupérant l'id du twit dans l'url

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useTwitsStore } from "../../../stores/useTwitsStore";
import { toast } from "sonner";
import { FIREBASE_URL } from "../../../firebase-config";
import Twit from "../../commonsComponents/Twit";
import ReTwit from "../../commonsComponents/ReTwit";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import Comments from "./components/Comments";
import { UserContext } from "../../../context/userContext";

export default function OneTwit() {
  const { currentUser, currentUserDatas } = useContext(UserContext);
  const { id_twit } = useParams();
  const [twit, setTwit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOneTwit() {
    try {
      const response = await fetch(FIREBASE_URL + `posts/${id_twit}.json`);

      if (!response.ok) {
        throw new Error("Une erreur est survenue !");
      }

      const data = await response.json();
      setLoading(false);

      // Convertir les données en un objet unique
      const twitData = {
        id: id_twit,
        ...data,
      };
      console.log(twitData);
      setTwit(twitData);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchOneTwit();
    console.log("twit :", twit);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <div className="pt-24 text-center">Une erreur est survenue !</div>;
  }
  {
    /* Affichage des Twitts */
  }
  if (!loading && !error) {
   
    return(
      <>
      {twit.date == twit.original_date ? (
      <Twit  twit={twit} />
    ) : (
      <ReTwit  twit={twit} />
    )}
     
      <Comments twit={twit} />
      </>
    )
  }
}
