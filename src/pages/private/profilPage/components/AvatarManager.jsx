import { useState, useRef, useContext } from "react";
import { FIREBASE_URL } from "../../../../firebase-config";
import { toast } from "sonner";
import { UserContext } from "../../../../context/userContext";

export default function AvatarManager() {
  const { currentUser, setCurrentUserDatas } = useContext(UserContext);

  const avatarUrlRef = useRef("");
  const [errorFormAvatar, setErrorFormAvatar] = useState("");

  // pour modifier un avatar utilisateur
  async function handleFormAvatar(e) {
    e.preventDefault();
    // vérification de l'URL du nouvel avatar
    const newAvatarUrl = avatarUrlRef.current.value.trim();
    if (newAvatarUrl === "") {
      setErrorFormAvatar(
        "Vous devez renseigner une URL si vous souhaitez modifier votre avatar !"
      );
      setTimeout(() => {
        setErrorFormAvatar("");
      }, 3000);
      return;
    }
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/;
    if (!urlRegex.test(newAvatarUrl)) {
      setErrorFormAvatar("L'URL que vous avez entrée n'est pas valide !");
      setTimeout(() => {
        setErrorFormAvatar("");
      }, 3000);
      return;
    }
    // MAJ avatar par PATCH dans Realtime Database
    try {
      const updateResponse = await fetch(
        FIREBASE_URL + `users/${currentUser.uid}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatar_url: newAvatarUrl }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Echec de la modification de votre avatar.");
      }

      setCurrentUserDatas((prevData) => ({
        ...prevData,
        avatar_url: newAvatarUrl,
      }));
      // MAJ dans le localstorage
      const currentUserDataCopy = JSON.parse(
        sessionStorage.getItem("currentUserDatas")
      );
      currentUserDataCopy.avatar_url = newAvatarUrl;
      sessionStorage.setItem(
        "currentUserDatas",
        JSON.stringify(currentUserDataCopy)
      );

      toast.success("Nouvel avatar enregistré avec succès !");
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Echec du changement d'avatar");
    }
  }

  return (
    <>
    <form className="flex mb-4 gap-x-4" onSubmit={handleFormAvatar}>
      <input
        type="text"
        ref={avatarUrlRef}
        placeholder="URL de votre nouvel avatar"
        className="w-4/5 p-2 text-white rounded-md bg-neutral-800"
        />
      <button
        type="submit"
        className="w-1/5 p-2 mx-auto text-xs font-bold bg-blue-500 rounded-full sm:text-md flexMid hover:bg-blue-600"
        >
        Modifier l'avatar
      </button>
    </form>
      <p className={`my-2 text-red-500 text-md`}>{errorFormAvatar}</p>
        </>
  );
}
