
import { useState, useRef, useContext } from "react";

import { useTwitsStore } from "../../../../stores/useTwitsStore";
import { toast } from "sonner";
import { FIREBASE_URL } from "../../../../firebase-config";
import { UserContext } from "../../../../context/userContext";
import CommentTweet from "./CommentTweet";


 export default function Comments({twit}) {

    const { currentUser, currentUserDatas } = useContext(UserContext);

 //  Ref pour formulaire de commentaire
 const text = useRef("");
 const formComment = useRef("");

 // Gestion longueur du commentaire
 const maxLength = 250;
 const [validation, setValidation] = useState({
   color: "neutral",
   comment: `{Commentaire : ${maxLength} caractères maximum.}`,
 });
 // vérifie si le formulaire est n'est pas vide ou le texte trop long
 function validationFormDatas() {
    setValidation("");
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

  async function handleFormComment(e) {
    e.preventDefault();
    //  Si la validation du formulaire échoue, on sort
    if (!validationFormDatas()) {
      return;
    }
  
    // Créer un nouveau commentaire
    const newComment = {
      date: Date.now(),
      author_comment: currentUserDatas.login,
      text_comment: text.current.value,
    };
  
    try {
      // Envoyer le nouveau commentaire à la base de données
      const response = await fetch(FIREBASE_URL + `posts/${twit.id}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: [...twit.comments, newComment], // Ajouter le nouveau commentaire à la liste des commentaires existants
        }),
      });
  
      if (!response.ok) {
        throw new Error(
          "Une erreur est survenue lors de l'enregistrement du commentaire."
        );
      }
  
      // Mettre à jour le twit dans le store avec le nouveau commentaire
      setTwit({
        ...twit,
        comments: [...twit.comments, newComment],
      });
  
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
      toast.error("Une erreur est survenue lors de l'enregistrement du commentaire.");
    }
  }
  
 
return (
    <div >
        {/* formulaire pour commentaire si user connecté */}
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
      {twit.comments
        .slice()
        .reverse()
        .map((comment, index) => (
          <CommentTweet key={index} comment={comment} />
        ))}



    </div>

  );

}