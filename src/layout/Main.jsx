import Footer from "./navbar/Footer";
import Header from "./navbar/Header";
import { Toaster } from "sonner";
import { Outlet, useNavigation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import BlogPart from "./rightPage/BlogPart";
import LoadingComponent from "../pages/commonsComponents/toolsComponents/LoadingComponent";

export default function Main() {
  const { currentUser, loading } = useContext(UserContext);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex min-h-screen mx-auto max-w-7xl bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50">
      {/* Menu pour pc / tablette */}
      <div className="relative hidden p-4 border-r-2 sm:block sm:min-w-32 xl:min-w-72 xl:p-8 border-neutral-500">
        <Header />
      </div>
      {/* Menu pour smartphone en pieds de page */}
      <div className="fixed bottom-0 left-0 right-0 z-10 w-full h-24 border-t-2 bg-neutral-50 dark:bg-neutral-900 sm:hidden border-neutral-500">
        <Footer />
      </div>

      {/* twit */}
      <div className="flex-grow">
        <Toaster position="top-center" richColors expand={true} />
        <Outlet />
      </div>

      {/* colonne lien blog à droite de l'écran pc/tablette */}
      <div className="relative hidden border-l-2 w-72 lg:block lg:min-w-80 border-neutral-500">
        <BlogPart />
      </div>
    </div>
  );
}
