import { useState, useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import { FIREBASE_URL } from "../../../../firebase-config";
import { toast } from "sonner";

export default function BiographyManager() {
  const {
    currentUser,
    currentUserDatas,
    setCurrentUserDatas,
  } = useContext(UserContext);

  const [errorFormBiography, setErrorFormBiography] = useState("");

  //Pour modifier la biographie de l'utilisateur
  async function handleFormBiography(e) {
    e.preventDefault();

    if (currentUserDatas.biography.trim() === "") {
      setErrorFormBiography(
        "Ne soyez pas timide ! Racontez-nous qui vous êtes en quelques mots !"
      );
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000);
      return;
    }

    if (currentUserDatas.biography.length > 200) {
      setErrorFormBiography(
        `200 caractères max, pas ${currentUserDatas.biography.length} ! On ne raconte pas TOUTE sa vie !!!`
      );
      setTimeout(() => {
        setErrorFormBiography("");
      }, 5000);
      return;
    }

    try {
      // Mettre à jour la biographie dans la base de données Firebase
      const updateResponse = await fetch(
        FIREBASE_URL + `users/${currentUser.uid}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ biography: currentUserDatas.biography }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update user biography");
      }

      // Mettre à jour la biographie dans currentUserDatas
      setCurrentUserDatas((prevData) => ({
        ...prevData,
        biography: currentUserDatas.biography,
      }));

      // Mettre à jour la biographie dans le sessionStorage
      const currentUserDataCopy = JSON.parse(
        sessionStorage.getItem("currentUserDatas")
      );
      currentUserDataCopy.biography = currentUserDatas.biography;
      sessionStorage.setItem(
        "currentUserDatas",
        JSON.stringify(currentUserDataCopy)
      );

      toast.success("Biographie mise à jour avec succès");
    } catch (error) {
      toast.error("Une erreur s'est produite :", error);
    }
  }

  return (
    <>
      <form
        className="flex flex-col mt-4 gap-x-4"
        onSubmit={handleFormBiography}
      >
        <textarea
          type="text"
          placeholder="Un petit de vous en 200 caractères max !"
          className="w-full h-24 p-2 text-white rounded-md bg-neutral-800"
          value={currentUserDatas.biography}
          onChange={(e) =>
            setCurrentUserDatas({
              ...currentUserDatas,
              biography: e.target.value,
            })
          }
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 mx-auto my-10 text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600"
        >
          Valider ma nouvelle présentation
        </button>
      </form>
      <p className={`mt-2 text-red-500 text-md`}>{errorFormBiography}</p>
    </>
  );
}
