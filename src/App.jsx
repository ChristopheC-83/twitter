import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import Main from "./layout/Main";
import Hashtags from "./pages/Hashtags";
import Favoris from "./pages/Favoris";
import Profil from "./pages/Profil";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));


function App() {

  const router = createBrowserRouter([
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
        },{
          path: "/hashtags",
          element: (
            <Hashtags/>
          ),
        },{
        },{
          path: "/favoris",
          element: (
            <Favoris/>
          ),
        },{
        },{
          path: "/profil",
          element: (
            <Profil/>
          ),
        },{
        },{
          path: "/connexion",
          element: (
            <Hashtags/>
          ),
        },{
          path: "/*",
          element: (
            <Error/>
          ),
        },







      ]}
    ])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
