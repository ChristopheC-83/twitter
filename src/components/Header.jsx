// barre de menu à gauche de la page
// complete si largeur écran > 1280px
// seulement icones si largeur 640px < écran < 1280px
//  sous les 640px, menu en pied de page avec le composant Footer

import { LuHome } from "react-icons/lu";

import NavlinkHeader from "./toolsComponents/NavlinkHeader";

export default function Header() {
  return (
      <div className="flex flex-col">
        <NavlinkHeader to="/"  icon = {<LuHome/>} text = {"Accueil"}/>
      </div>
  );
}
