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

const decksLoader = async () => {
  const token = localStorage.getItem("token"); // Récupérer le token

  // Vérifier si le token existe
  if (!token) {
    throw new Response("Non autorisé, veuillez vous connecter.", {
      status: 401,
    });
  }

  try {
    const response = await fetch(
      "https://srochedix.alwaysdata.net/ReignApi/api/v1/decks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        },
      }
    );

    // Vérifier si la réponse est correcte
    if (!response.ok) {
      const errorResponse = await response.text(); // Lecture du texte de la réponse pour plus de détails
      throw new Response(
        `Erreur lors du chargement des decks: ${errorResponse}`,
        { status: response.status }
      );
    }

    // Retourner la réponse en JSON
    return await response.json();
  } catch (error) {
    // Gestion des erreurs de fetch ou de parsing
    console.error("Erreur lors de la récupération des decks:", error.message);
    throw new Response("Erreur de chargement des decks.", { status: 500 });
  }
};

const loader = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    return decksLoader(); // Si le token existe, utilise le loader de decks
  } else {
    return fetch("https://srochedix.alwaysdata.net/ReignApi/api/v1/decks"); // Sinon, fais une requête sans token
  }
};
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
        loader,
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
        <Feedback />
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
          // console.log("Service Worker enregistré avec succès :", registration);
        })
        .catch((error) => {
          // console.log("Erreur d'enregistrement du Service Worker :", error);
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

  return (
    <FeedbackProvider>
      <RouterProvider router={router} />
    </FeedbackProvider>
  );
}

export default App;
