//  profil d'un utilisateur
//  avec la page timeline de l'utilisateur connecté

import { useContext, useEffect, useState } from "react";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import AvatarManager from "./components/AvatarManager";
import InfosUSer from "./components/InfosUSer";
import BiographyManager from "./components/BiographyManager";
import DeleteAccount from "./components/DeleteAccount";
import AvatarNameUser from "./components/AvatarNameUser";
import UsersFollowed from "./components/UsersFollowed";
import { UserContext } from "../../../context/userContext";

export default function Profil() {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <LoadingComponent />;
  }
  
  return (
    <div className="flex flex-col w-full p-4 rounded shadow-md mb-36 sm:p-6 md:p-8">
      <div className="flex flex-col">
        <DeleteAccount />
        <AvatarNameUser />
        <AvatarManager />
        <InfosUSer />
        <BiographyManager />
        <UsersFollowed />
      </div>
    </div>
  );
}
