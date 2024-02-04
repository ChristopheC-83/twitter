import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useContext } from "react";
import Error from "./pages/Error";
import Hashtags from "./pages/Hashtags";
import Favoris from "./pages/Favoris";
import Profil from "./pages/Profil";
import { lazy, Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "./context/userContext";

const Home = lazy(() => import("./pages/Home"));
const TimeLine = lazy(() => import("./pages/TimeLine"));
const OneTwit = lazy(() => import("./pages/OneTwit"));
const Main = lazy(() => import("./layout/Main"));


export default function App() {
  
  const { currentUser, loading } = useContext(UserContext);

  return (
    <div>
      <Suspense>
        <RouterProvider router={
        
        createBrowserRouter([
          {
            path: "/",
            element: <Main />,
            // errorElement: <Error />,
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
                element: <Hashtags />,
              },
              {
                path: "/favoris",
                element: <Favoris />,
              },
              {
                path: "/profil",
                element: <Profil />,
              },
              {
                path: "/connexion",
                element: <Hashtags />,
              },
              {
                path: "/user/:idUser",
                element: (
                  <Suspense>
                    <TimeLine />
                  </Suspense>
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
                element: <Error />,
              },
            ],
          },
        ])
        
        
        
        } />
      </Suspense>
    </div>
  );
}
