import Footer from "../components/Footer";
import Header from "../components/Header";
import Blog from "../components/Blog";
import { Outlet, useNavigation } from "react-router-dom";

export default function Main() {
  return (
    <div className="min-h-screen max-w-7xl bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 flex mx-auto relative">
      {/* Menu pour pc / tablette */}
      <div className="hidden min-h-screen absolute top-0 bottom-0 left-0 sm:flex sm:w-28 sm:flex-col xl:w-72 p-4 xl:p-8 border-r-2 ">
        <Header />
      </div>
      {/* Menu pour smartphone en pieds de page */}
      <div className="h-24 fixed z-20 bg-neutral-50 dark:bg-neutral-900 bottom-0 left-0 right-0 sm:hidden p-4 flex justify-between items-center border-t-2">
        <Footer />
      </div>

      {/* twit */}
      <div className=" z-10 lg:mr-72 xl:mr-80 sm:ml-28 xl:ml-72 ">
        <Outlet />
      </div>

      {/* colonne lien blog à droite de l'écran pc/tablette */}
      <div className="hidden absolute w-72 bottom-0 top-0 right-0 lg:block xl:w-80 border-l-2">
        <Blog />
      </div>
    </div>
  );
}
