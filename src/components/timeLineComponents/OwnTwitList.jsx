// La liste des twit de l'utilisateur
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Twit from "../Twit";
import { FaSpinner } from "react-icons/fa";

export default function OwnTwitList() {
  const { idUser } = useParams();

  const [twits, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchUserTweets(username="") {
    setLoading(true);
    fetch(
      "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          toast.error("Une erreur est survenue !");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);

        // Filtrer les tweets pour récupérer seulement ceux de l'utilisateur spécifié
        
        const userTweets = Object.values(data).filter(
          (tweet) => tweet.author === username
        );

        setTweets(userTweets);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        toast.error(error);
      });
  }

  useEffect(() => {
    fetchUserTweets(idUser);
  }, []);

  return (
    <div>
      <div className="flex flex-col-reverse flex-grow text-xl">
        {/* <Toaster position="top-center" richColors expand={true} /> */}
        {/* Loader */}
        {loading && (
          <div className="flexMid">
            <FaSpinner className="animate-spin" />
            <span className="ml-4">Chargement...</span>
          </div>
        )}

        {/* Erreur */}
        {error && <div>Une erreur est survenue !</div>}

        {/* Affichage des Twitts */}
        {!loading & !error &&
          twits.map((twit) => <Twit key={twit.date} twit={twit} />)}
      </div>
    </div>
  );
}
