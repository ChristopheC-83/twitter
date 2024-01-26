import Footer from "../components/Footer";
import Header from "../components/Header";
import Blog from "../components/Blog";
import { Outlet, useNavigation } from "react-router-dom";

export default function Main() {
  return (
    <div className="min-h-screen max-w-7xl bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 flex mx-auto relative">
      {/* Menu pour pc / tablette */}
      <div className="hidden min-h-screen fixed top-0 bottom-0 left-0 sm:block  sm:w-32 xl:w-72 p-8 border-r-2 border-neutral-500">
        <Header />
      </div>
      {/* Menu pour smartphone en pieds de page */}
      <div className="h-24 w-full fixed z-10 bg-neutral-50 dark:bg-neutral-900 bottom-0 left-0 right-0 sm:hidden p-4 border-t-2 border-neutral-500">
        <Footer />
      </div>

      {/* twit */}
      <div className=" lg:mr-72 xl:mr-80 sm:ml-32 xl:ml-72 ">
        <Outlet />
      </div>

      {/* colonne lien blog à droite de l'écran pc/tablette */}
      <div className="hidden fixed w-72 bottom-0 top-0 right-0 lg:block xl:w-80 border-l-2 border-neutral-500">
        <Blog />
      </div>
    </div>
  );
}
