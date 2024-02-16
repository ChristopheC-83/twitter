import { useEffect, useState } from "react";
import { FIREBASE_URL } from "../../../firebase-config";
import HeaderUser from "./components/HeaderUser";
import TwitsListOfUser from "./components/TwitsListOfUser";

import { useParams } from "react-router-dom";

export default function AllTwitsOfOneUser() {
  const { user_id } = useParams();
  const [userExists, setUserExists] = useState(false);
  
  async function checkIfUserExists(user_id) {
    try {
      const response = await fetch(FIREBASE_URL + `users/${user_id}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();

      return userData !== null;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      throw new Error("Failed to check if user exists");
    }
  }

  useEffect(() => {
    async function fetchData() {
      const exists = await checkIfUserExists(user_id);
      setUserExists(exists);
    }

    fetchData();
  }, [user_id]);

  return (
    <div>
      {userExists === null ? (
        <p>Chargement...</p>
      ) : userExists ? (
        <HeaderUser user_id={user_id} />
      ) : (
        <p className="p-4 text-xl text-center">Il n'est plus inscrit, mais nous avons toujours ses posts ! <br /> S'il en reste...</p>
      )}
      <TwitsListOfUser user_id={user_id} />
    </div>
  );
}
