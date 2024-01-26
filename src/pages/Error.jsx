import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-evenly">
      <div className="text-3xl lg:text-6xl z-10 ">Restricted zone !</div>
      <img src="https://mycloud.barpat.fun/public/assets/Images/Bibliotheque/perso_rpg/dragon_epee.jpg" alt="" />
      <NavLink
        to="/"
        className="text-3xl lg:text-3xl z-10 hover:underline hover:underline-offset-8	 "
      >
       =&gt;  Go Home !!!  &lt;=
      </NavLink>
    </div>
  );
}
