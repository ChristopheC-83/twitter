import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import Main from "./layout/Main";
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
