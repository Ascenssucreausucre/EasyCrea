import { DeckList } from "../components/ProfileDeckCard";
import { useUser } from "../context/UserContext"; // Utilisation du hook personnalisé
import { useState } from "react";
import { useEffect } from "react";

export function Administrateur() {
  const { userData } = useUser(); // Accéder aux données utilisateur

  async function getUserCards() {
    const userId = userData?.id_createur;
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/cartes/administrateur`
      );
      const data = await response.json();
      if (data && Array.isArray(data.deck)) {
        return data; // Retourner la liste correcte
      } else {
        console.error("Données inattendues:", data);
        return []; // Retourner un tableau vide si la structure est incorrecte
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des informations", error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

  const [infos, setInfos] = useState([]); // État pour stocker les données récupérées

  useEffect(() => {
    // Appel de la fonction getDeck lorsque le composant est monté
    async function fetchData() {
      const data = await getUserCards();
      setInfos(data.deck); // Mise à jour de l'état avec les données récupérées
    }
    fetchData();
  }, []);

  if (!userData) {
    return <div>Chargement...</div>; // Afficher un message ou rediriger si nécessaire
  }

  return (
    <div>
      <h1 className="title">Admin Dashboard</h1>
      <p>Affichage des decks et cartes :</p>
      {infos.length > 0 ? (
        <DeckList infos={infos} />
      ) : (
        <p>Chargement des decks...</p>
      )}
    </div>
  );
}
