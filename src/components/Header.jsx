// barre de menu à gauche de la page
// complete si largeur écran > 1280px
// seulement icones si largeur 640px < écran < 1280px
//  sous les 640px, menu en pied de page avec le composant Footer
import { GoHeart } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { FaHashtag } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
// import { SlLogout } from "react-icons/sl";<SlLogout />
import { FaFeather } from "react-icons/fa";
import NavlinkHeader from "./toolsComponents/NavlinkHeader";
import Btn from "./toolsComponents/Btn";

export default function Header() {
  return (
    <div className="flex flex-col h-full gap-y-8 justify-between items-start pb-52">
      <NavlinkHeader to="/" icon={<LuHome />} text={"Accueil"} />
      <NavlinkHeader to="/hashtags" icon={<FaHashtag />} text={"HashTags"} />
      <NavlinkHeader to="/favoris" icon={<GoHeart />} text={"Favoris"} />
      <NavlinkHeader to="/profil" icon={<FaRegUser />} text={"Profil"} />
      <NavlinkHeader to="/connexion" icon={<SlLogin />} text={"Connexion"} />
      <button className="bg-blue-500 p-4 border-white rounded-full text-3xl font-bold flexMid hover:bg-blue-600">
        <span className="mr-4 hidden xl:block ">Ecrire</span>
        <span className="text-4xl">
          <FaFeather />
        </span>
      </button>
    </div>
  );
}
