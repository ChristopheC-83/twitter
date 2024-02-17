// encart d'un twit ou d'un retwit dans une liste
// les 2 ont des visuels différents en fonction de la date = ou pas original_date
// contient dan sles 2 cas la fonction retwit

import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

import { useTwitsStore } from "../../stores/useTwitsStore";
import { FIREBASE_URL } from "../../firebase-config";
import scrollToTop from "../../utils/scrollToTop";
import { toast } from "sonner";

import ShowTwit from "./twitsComponents/ShowTwit";
import ShowReTwit from "./twitsComponents/ShowReTwit";

export default function MainTwit({ twit }) {
  const navigate = useNavigate();
  const { currentUserDatas } = useContext(UserContext);
  const { addTwit, deleteTwit, setMaj } = useTwitsStore();

  //   functions
  async function deleteTwitFunction(id_twit) {
    try {
      // Supprimer le twit de la base de données en temps réel
      fetch(`${FIREBASE_URL}posts/${id_twit}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Supprimer le twit localement dans le store Zustand
      deleteTwit(id_twit);
      toast.success("Twit supprimé avec succès !");
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la suppression du twit :",
        error
      );
    }
  }

  async function retwit() {
    try {
      const newPost = {
        text: twit.text,
        img: twit.img,
        author: currentUserDatas.login,
        id_author: currentUserDatas.uid,
        original_author: twit.original_author,
        id_original_author: twit.id_original_author,
        date: Date.now(),
        original_date: twit.original_date,
        comments: [
          {
            author_comment: currentUserDatas.login,
            author_id_comment: currentUserDatas.uid,
            date: Date.now(),
            text_comment: "Sois le premier à commenter ce post !",
          },
        ],
      };
      const response = await fetch(FIREBASE_URL + "posts.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error(
          "Une erreur est survenue lors de l'enregistrement du twit."
        );
      }
      // Ajoutez le nouveau twit localement dans le store Zustand
      addTwit(newPost);
      navigate(`/`);
      scrollToTop();
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (twit.date === twit.original_date) {
    return (
      <ShowTwit
        twit={twit}
        retwit={retwit}
        deleteTwitFunction={deleteTwitFunction}
      />
    );
  }
  if (twit.date != twit.original_date) {
    return (
      <ShowReTwit
        twit={twit}
        retwit={retwit}
        deleteTwitFunction={deleteTwitFunction}
      />
    );
  }
}
