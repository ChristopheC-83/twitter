//  profil d'un utilisateur
//  avec la page timeline de l'utilisateur connecté

import { useState } from "react";
import LoadingComponent from "../../commonsComponents/toolsComponents/LoadingComponent";
import AvatarManager from "./components/AvatarManager";
import InfosUSer from "./components/InfosUSer";
import BiographyManager from "./components/BiographyManager";
import DeleteAccount from "./components/DeleteAccount";
import AvatarNameUser from "./components/AvatarNameUser";
import UsersFollowed from "./components/UsersFollowed";

export default function Profil() {

  // if (loading) {
  //   return <LoadingComponent />;
  // }

  return (
    <div className="flex flex-col w-full p-4 rounded shadow-md mb-36 sm:p-6 md:p-8">
      <div className="flex flex-col">
        <DeleteAccount />
        <AvatarNameUser />
        <AvatarManager />
        <InfosUSer />
        <BiographyManager />
        <UsersFollowed/>
      </div>
    </div>
  );
}
