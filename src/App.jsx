import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/public/homePage/Home"));
const AllTwitsOfOneUser = lazy(() =>
  import("./pages/public/allTwitsOfOneUser/AllTwitsOfOneUser")
);
const OneTwit = lazy(() => import("./pages/public/oneTwit/OneTwit"));
const Main = lazy(() => import("./layout/Main"));
const Error = lazy(() => import("./pages/public/Error"));
const Favoris = lazy(() =>
  import("./pages/private/favoritePage/FavoritesPage")
);
const Profil = lazy(() => import("./pages/private/profilPage/Profil"));

export default function App() {
  const { currentUser } = useContext(UserContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/favoris",
          element: <Suspense>{currentUser ? <Favoris /> : <Error />}</Suspense>,
        },
        {
          path: "/profil",
          element: <Suspense>{currentUser ? <Profil /> : <Error />}</Suspense>,
        },
        {
          path: "/user/:user_id",
          element: (
            <Suspense>
              <AllTwitsOfOneUser />
            </Suspense>
          ),
        },
        {
          path: "/post/:id_twit",
          element: (
            <Suspense>
              <OneTwit />
            </Suspense>
          ),
        },
        {
          path: "/*",
          element: (
            <Suspense>
              <Error />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
