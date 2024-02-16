import { toast } from "sonner";
import { FIREBASE_URL } from "../firebase-config";

export  function deleteTwitFunction(id_twit) {
    try {
      // Supprimer le twit de la base de données en temps réel
      fetch(`${FIREBASE_URL}posts/${id_twit}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Twit supprimé avec succès !");
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la suppression du twit :",
        error
      );
    }
  }