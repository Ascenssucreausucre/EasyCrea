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
import { NavBar } from "./components/Navbar";
import { Administrateur } from "./pages/Administrateur";
import { AjouterDeck } from "./pages/AjouterDeck";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: () =>
          fetch(`https://srochedix.alwaysdata.net/ReignApi/api/v1/decks`),
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
        path: "/administrateur/",
        element: <Administrateur />,
      },
      {
        path: "/deck/ajouter/:id",
        element: <AjouterCarte />,
      },
      {
        path: "/ajouter-deck",
        element: <AjouterDeck />,
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

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
