import { NavLink } from "react-router-dom";

export default function NoFavorites() {
  return (
    <div className="p-4 font-semibold text-white text-md md:text-2xl">
      <h2 className="my-8 text-2xl text-center text-red-300 underline underline-offset-8 md:text-4xl">
        Vous n'avez pas de favoris !
      </h2>
      <img
        src="https://images.unsplash.com/photo-1542984385-2184d2ba45eb?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dame avec une loupe"
        className="mb-8 rounded-xl whiteShadow"
      />
      <p>
        N'hesitez pas à vous abonner à des utilisateurs pour voir leurs tweets
        ici.
      </p>
      <NavLink
        to="/"
        className="block w-1/2 p-4 mx-auto my-8 text-center bg-blue-500 rounded-lg hover:bg-blue-700"
      >
        Retour à l'accueil
      </NavLink>
    </div>
  );
}
