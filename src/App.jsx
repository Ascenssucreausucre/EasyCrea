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
import { useState, useEffect } from "react";
import { FeedbackProvider } from "./context/FeedbackContext";
import { Feedback } from "./components/Feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />, // La homepage où la bannière s'affichera
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
        <Feedback/>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  // Enregistrer le service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker enregistré avec succès :", registration);
        })
        .catch((error) => {
          console.log("Erreur d'enregistrement du Service Worker :", error);
        });
    }
  }, []);

  // Suivi de l'état de l'installation (optionnel si tu veux vérifier que l'application est déjà installée)
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
  }, []);

  return <FeedbackProvider>
      <RouterProvider router={router} />
    </FeedbackProvider>;
}

export default App;
