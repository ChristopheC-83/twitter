import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <section className="flex flex-col items-center w-full h-screen max-h-svh pb-[120px] sm:pb-0 justify-start gap-8">
      <div className="z-10 pt-4 text-3xl text-red-500 cursor-default lg:text-6xl hover:text-red-600">Restricted zone !</div>
      <img src="https://mycloud.barpat.fun/public/assets/Images/Bibliotheque/perso_rpg/dragon_epee.jpg" alt="" />
      <NavLink
        to="/"
        className="z-10 text-3xl text-red-500 transition-all duration-300 cursor-pointer lg:text-3xl hover:text-blue-500"
      >
       =&gt;  Go Home !!!  &lt;=
      </NavLink>
    </section>
  );
}
