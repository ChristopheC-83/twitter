
import { GoHeart } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { FaHashtag } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
import { FaFeather } from "react-icons/fa";
import NavlinkFooter from "./toolsComponents/NavLinkFooter";


//  menu en pied de page pour les écran < 640px de large

export default function Footer() {
  return (
    <footer>
      <div className="flex items-center h-24 justify-evenly">
        <NavlinkFooter to="/" icon={<LuHome />} text={"Accueil"} />
        <NavlinkFooter to="/hashtags" icon={<FaHashtag />} text={"Hashtags"} />
        <NavlinkFooter to="/favoris" icon={<GoHeart />} text={"Favoris"} />
        <NavlinkFooter to="/profil" icon={<FaRegUser />} text={"Profil"} />
        <NavlinkFooter to="/connexion" icon={<SlLogin />} text={"Connexion"} />
      </div>
      <button className="absolute p-4 text-3xl font-bold bg-blue-500 border-white rounded-full top-[-80px] right-[10px] flexMid hover:bg-blue-600 xl:mx-auto">
        <span className="text-4xl">
          <FaFeather />
        </span>
      </button>
    </footer>
  );
}
