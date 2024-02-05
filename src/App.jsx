import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useContext } from "react";

import { lazy, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "./context/userContext";

const Home = lazy(() => import("./pages/public/Home"));
const TimeLine = lazy(() => import("./pages/public/TimeLine"));
const OneTwit = lazy(() => import("./pages/public/OneTwit"));
const Main = lazy(() => import("./layout/Main"));
const Error = lazy(() => import("./pages/public/Error"));
const Hashtags = lazy(() => import("./pages/public/Hashtags"));
const Favoris = lazy(() => import("./pages/private/Favoris"));
const Profil = lazy(() => import("./pages/private/Profil"));

export default function App() {
  const { currentUser, loading } = useContext(UserContext);

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
                path: "/hashtags",
                element: (
                  <Suspense>
                    <Hashtags />
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
                path: "/connexion",
                element: <Hashtags />,
              },
              {
                path: "/user/:idUser",
                element: (
                  <Suspense>{currentUser ? <TimeLine /> : <Error />}</Suspense>
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
              // {
              //   path: "/:idTwit",
              //   element: (
              //     <Suspense>
              //       <TimeLine />
              //     </Suspense>
              //   ),
              // },
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
