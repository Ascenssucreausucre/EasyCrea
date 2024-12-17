import { useState } from "react";
import { Home } from "./pages/Home";
import {
  createBrowserRouter,
  Link,
  Outlet,
  NavLink,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Createur } from "./pages/Createur";
import { AjouterCarte } from "./pages/AjouterCarte";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/createur/:id",
    element: <Createur />,
  },
  {
    path: "/deck/ajouter/:id",
    element: <AjouterCarte />,
  },
]);

function App() {
  // const navigate = useNavigate();

  // const token = localStorage.getItem("token");

  // if (!token) {
  //   // Redirection vers la page login
  //   navigate("/login");
  // }

  return <RouterProvider router={router} />;
}

export default App;
