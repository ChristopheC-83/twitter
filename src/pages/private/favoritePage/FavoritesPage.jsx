import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { FIREBASE_URL } from "../../../firebase-config";
import { toast } from "sonner";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import NoFavorites from "./components/NoFavorites";
import MainTwit from "../../commonsComponents/MainTwit";

export default function FavoritesPage() {
  const { currentUserDatas, setCurrentUserDatas } = useContext(UserContext);
  const [filteredTwits, setFilteredTwits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTwitsFiltered() {
    try {
      const response = await fetch(FIREBASE_URL + "posts.json");

      if (!response.ok) {
        throw new Error("Une erreur est survenue !");
      }

      const data = await response.json();

      const tweetsArray = Object.entries(data).map(([id, twit]) => ({
        id,
        ...twit,
      }));
      const filteredTwits = tweetsArray.filter((twit) =>
        currentUserDatas.users_followed.includes(twit.id_author)
      );
      setFilteredTwits(filteredTwits);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (currentUserDatas.users_followed) {
      fetchTwitsFiltered();
      console.log("currentUserDatas.users_followed", currentUserDatas.users_followed);
    }else{
      setCurrentUserDatas((prevData) => ({
        ...prevData,
        users_followed: [],
      }));
    }
  }, [currentUserDatas.users_followed]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div className="pt-24 text-center">Une erreur est survenue !</div>;
  }

  if (
    !currentUserDatas.users_followed ||
    currentUserDatas.users_followed.length === 0
  ) {
    return (
      <NoFavorites/>
    );
  }

  return (
    <>
      <p className="sticky top-0 py-4 text-xl text-center border-b sm:text-2xl sm:py-6 md:py-8 md:text-3xl border-neutral-500 bg-neutral-900">
        <span className="font-bold">{currentUserDatas.login}</span>, les Twits
        de tes créateurs favoris !
      </p>
      <div className="flex flex-col-reverse flex-grow text-xl">
        {filteredTwits.map((twit) => (
          <MainTwit key={twit.date} twit={twit} />
        ))}
      </div>
    </>
  );
}
