// Nous récupérons ici les commentaires
// et gérons le formulaire pour en poster
// les infos de ce twit sont passées par le parent en props

import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../../../../context/userContext";

import { toast } from "sonner";
import { FIREBASE_URL } from "../../../../firebase-config";
import CommentTweet from "./CommentTweet";

export default function Comments({ twit }) {
  const { currentUser, currentUserDatas } = useContext(UserContext);
  const [currentComments, setCurrentComments] = useState(twit.comments);
  //  Ref pour formulaire de commentaire
  const formComment = useRef("");
  const text = useRef("");

  // Gestion longueur du commentaire
  const maxLength = 250;
  const [validation, setValidation] = useState({
    color: "neutral",
    comment: `{Commentaire : ${maxLength} caractères maximum.}`,
  });

  // vérifie si le formulaire est n'est pas vide ou le texte trop long
  function validationFormDatas() {
    // setValidation("");
    // commentaire vide ?
    if (text.current.value.trim() === "") {
      setValidation({
        color: "red",
        comment: "Vous ne vouliez pas écrire quelque chose !?!",
      });
      return false;
    }
    // commentaire trop long ?
    if (text.current.value.length > maxLength) {
      setValidation({
        color: "red",
        comment:
          maxLength +
          " caractères max, pas " +
          text.current.value.length +
          " !",
      });
      return false;
    }
    return true;
  }

  // function

  // après validation du formulaire, envoi du commentaire
  // en DB ET en local pour MAJ instantanée
  async function handleFormComment(e) {
    e.preventDefault();
    //  Si la validation du formulaire échoue, on sort
    if (!validationFormDatas()) {
      return;
    }

    // Créer un nouveau commentaire
    const newComment = {
      date: Date.now(),
      author_id_comment: currentUserDatas.uid,
      author_comment: currentUserDatas.login,
      text_comment: text.current.value,
    };

    try {
      // Envoyer le nouveau commentaire à la base de données
      const response = await fetch(FIREBASE_URL + `posts/${twit.id}.json`, {
        // Patch car on accède à une info spécifique
        // Put demanderait le renvoi de TOUTES les infos du twit
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Ajouter en DB le nouveau commentaire à la liste des commentaires existants
          comments: [...twit.comments, newComment], 
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur est survenue lors de l'enregistrement du commentaire."
        );
      }
     

      // Mettre à jour les commentaires locaux pour accés en temps réel
      setCurrentComments((prevComments) => [...prevComments, newComment]);

      // Réinitialiser le formulaire
      formComment.current.reset();
      setValidation({
        color: "neutral",
        comment: `{Commentaire : ${maxLength} caractères maximum.}`,
      });

      // Afficher un message de succès
      toast.success("Commentaire ajouté avec succès !");
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'enregistrement du commentaire :",
        error
      );
      toast.error(
        "Une erreur est survenue lors de l'enregistrement du commentaire."
      );
    }
  }

  // Chaque Twit à un 1er commentaire générique
  // on ne l'affiche que s'il n'y a pas d'autres commentaires

  let sliceNumber = null;
  if (currentComments.length > 1) {
    sliceNumber = 1;
  }

  
  // Mettre à jour les commentaires actuels lorsque twit.comments change
  useEffect(() => {
    setCurrentComments(twit.comments);
  }, [twit.comments]);

  return (
    <div>
      {/* formulaire pour commentaire si user connecté/currentUser existe */}
      {currentUser && (
        <div className="w-full px-4 py-4 border-t border-b rounded shadow-md sm:px-6 md:px-8 border-neutral-500">
          <form
            className="flex items-center justify-between w-full"
            ref={formComment}
            onSubmit={handleFormComment}
          >
            <textarea
              className="w-4/5 p-2 text-white rounded-md bg-neutral-800"
              placeholder="Votre commentaire"
              ref={text}
            ></textarea>
            <button
              onClick={handleFormComment}
              className="w-1/6 p-2 mx-auto font-bold bg-blue-500 rounded-full text-md flexMid hover:bg-blue-600 "
            >
              Envoyer
            </button>
          </form>

          <p className={`mt-2 text-${validation.color}-500 text-md`}>
            {validation.comment}
          </p>
        </div>
      )}
      {/* les commentaires existants */}
      {currentComments
        .slice(sliceNumber)
        .reverse()
        .map((comment, index) => (
          <CommentTweet key={index} comment={comment} />
        ))}
    </div>
  );
}
