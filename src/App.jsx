import { DecksPage } from "./pages/DecksPage";
import { Home } from "./pages/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Createur } from "./pages/Createur";
import { AjouterCarte } from "./pages/AjouterCarte";
import { NavBar } from "./components/NavBar";
import { Administrateur } from "./pages/Administrateur";
import { AjouterDeck } from "./pages/AjouterDeck";
import { useState, useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />, // La homepage où le bouton d'installation apparaîtra
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
    </>
  );
}

function App() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Enregistrer le service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((registration) => {
          console.log("Service Worker enregistré avec succès :", registration);
        })
        .catch((error) => {
          console.log("Erreur d'enregistrement du Service Worker :", error);
        });
    }
  }, []);

  // Écouter l'événement 'beforeinstallprompt'
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Empêche l'affichage automatique de la bannière
      setInstallPrompt(event); // Met à jour l'état avec l'événement
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Affichage conditionnel du bouton d'installation
  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt(); // Déclenche la boîte de dialogue d’installation
      installPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("L'utilisateur a installé l'application !");
        } else {
          console.log("L'utilisateur a refusé l'installation.");
        }
        setInstallPrompt(null);
      });
    }
  };

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true); // Vérifie si l'application est déjà installée
    }
  }, []);

  return (
    <RouterProvider router={router}>
      {/* Si l'app n'est pas encore installée et qu'on est sur la homepage, afficher le bouton */}
      <Home
        installPrompt={installPrompt}
        handleInstallClick={handleInstallClick}
      />
    </RouterProvider>
  );
}

export default App;
