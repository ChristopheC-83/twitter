import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useContext } from "react";

import { lazy, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "./context/userContext";

const Home = lazy(() => import("./pages/public/homePage/Home"));
const AllTwitsOfOneUser = lazy(() => import("./pages/public/allTwitsOfOneUser/AllTwitsOfOneUser"));
const OneTwit = lazy(() => import("./pages/public/OneTwit"));
const Main = lazy(() => import("./layout/Main"));
const Error = lazy(() => import("./pages/public/Error"));
const Favoris = lazy(() => import("./pages/private/favoritePage/FavoritesPage"));
const Profil = lazy(() => import("./pages/private/Profil"));

export default function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <RouterProvider
        router={createBrowserRouter([
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
                element: (
                  <Suspense>{currentUser ? <Favoris /> : <Error />}</Suspense>
                ),
              },
              {
                path: "/profil",
                element: (
                  <Suspense>{currentUser ? <Profil /> : <Error />}</Suspense>
                ),
              }, 
              {
                path: "/user/:user_id",
                element: (
                  <Suspense><AllTwitsOfOneUser /></Suspense>
                ),
              },
              {
                path: "/post/:idPost",
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
        ])}
      />
    </div>
  );
}
