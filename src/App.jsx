import { DecksPage } from "./pages/DecksPage";
import { Home } from "./pages/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Createur } from "./pages/Createur";
import { AjouterCarte } from "./pages/AjouterCarte";
import { NavBar } from "./components/NavBar";
import { Administrateur } from "./pages/Administrateur";
import { AjouterDeck } from "./pages/AjouterDeck";
import { Footer } from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/decks",
        element: <DecksPage />,
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
        loader: () =>
          fetch(
            `https://srochedix.alwaysdata.net/ReignApi/api/v1/cartes/administrateur`
          ),
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
      {/* <Footer /> */}
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
