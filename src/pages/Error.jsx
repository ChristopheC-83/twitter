import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <div className="w-screen lg:w-1/2 bg-[url('https://mycloud.barpat.fun/public/assets/Images/Bibliotheque/perso_rpg/dragon_epee.jpg')] flex-grow bg-cover bg-no-repeat bg-top my-8 flex flex-col items-center justify-evenly relative	mx-auto">
      <div className="absolute size-full bg-black opacity-70"></div>
      <div className="text-3xl lg:text-6xl z-10 ">Restricted zone !</div>
      <NavLink
        to="/"
        className="text-3xl lg:text-6xl z-10 hover:underline hover:underline-offset-8	 "
      >
        Go Home !!!
      </NavLink>
    </div>
  );
}
