import { useContext, useEffect, useState } from "react";
import { FIREBASE_URL } from "../../../../firebase-config";
import { UserContext } from "../../../../context/userContext";
import { GoHeart } from "react-icons/go";
import { NavLink } from "react-router-dom";

export default function UsersFollowed() {
  const { currentUserDatas } = useContext(UserContext);
  const [loginFollowedUsers, setLoginFollowedUsers] = useState([]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      const usersData = [];
      for (const userId of currentUserDatas.users_followed) {
        const userData = await fetchUserLogin(userId);
        if (userData) {
          usersData.push(userData);
        }
      }
      setLoginFollowedUsers(usersData);
    };

    if (
      currentUserDatas.users_followed &&
      currentUserDatas.users_followed.length > 0
    ) {
      fetchFollowedUsers();
    }
  }, [currentUserDatas.users_followed]);

  const fetchUserLogin = async (userId) => {
    try {
      const response = await fetch(`${FIREBASE_URL}/users/${userId}.json`);

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des données de l'utilisateur"
        );
      }

      const userData = await response.json();
      if (!userData || !userData.login || !userData.avatar_url) {
        throw new Error(
          "Les données de l'utilisateur sont incomplètes ou incorrectes"
        );
      }

      return { login: userData.login, avatarUrl: userData.avatar_url };
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération du login de l'utilisateur :",
        error
      );
      return null;
    }
  };

  if (!loginFollowedUsers || loginFollowedUsers.length === 0) {
    return (
      <p className="mt-4 text-center text-md">
        Vous n'avez pas encore de favoris
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center my-2 text-3xl gap-x-3">
        <GoHeart className="mr-1" />
        Mes Favoris :
      </div>
      <ul className="flex flex-col ml-8 gap-y-4">
        {loginFollowedUsers.map((userData, index) => (
          <NavLink
            key={index}
            to={`/user/${userData.login}`}
            className="flex items-center justify-start gap-x-8"
          >
            <img
              src={userData.avatarUrl}
              alt={`Avatar de ${userData.login}`}
              className="object-cover w-24 h-24 rounded-full"
            />
            <p className="text-3xl font-semibold">{userData.login}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
