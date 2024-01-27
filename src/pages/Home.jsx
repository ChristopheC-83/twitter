import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import Twit from "../components/Twit";

export default function Home() {
  const [twits, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchTwits() {
    setLoading(true);
    fetch(
      "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          toast.error("Un erreur est survenue !");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setTweets(Object.values(data));
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        toast.error(error);
      });
  }

  useEffect(() => {
    fetchTwits();
  }, []);

  return (
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
  );
}
