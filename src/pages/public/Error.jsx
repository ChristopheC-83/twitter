import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <section className="flex flex-col items-center w-full h-screen max-h-screen pb-[120px] sm:pb-0 justify-start gap-24">
      <div className="z-10 text-3xl lg:text-6xl ">Restricted zone !</div>
      <img src="https://mycloud.barpat.fun/public/assets/Images/Bibliotheque/perso_rpg/dragon_epee.jpg" alt="" />
      <NavLink
        to="/"
        className="z-10 text-3xl lg:text-3xl hover:underline hover:underline-offset-8 "
      >
       =&gt;  Go Home !!!  &lt;=
      </NavLink>
    </section>
  );
}
