import { useParams } from "react-router-dom";
import { DeckList } from "../components/DeckList";
import { useUser } from "../context/UserContext"; // Utilisation du hook personnalisé
import { useState, useEffect } from "react";

export function Createur() {
  const { userData } = useUser(); // Accéder aux données utilisateur
  const userId = useParams().id;

  async function getUserCards() {
    if (!userId) {
      return []; // Si userId est undefined, retourne un tableau vide
    }

    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/cartes/createur/${userId}`
      );
      const data = await response.json();
      if (data && Array.isArray(data.deck)) {
        return data.deck; // Retourne la liste correcte
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
    async function fetchData() {
      const data = await getUserCards();
      setInfos(data); // Mise à jour de l'état avec les données récupérées
    }
    fetchData();
  }, []); // Déclenche seulement lorsque userData change

  return (
    <div>
      <h1 className="title">Profil du créateur</h1>
      {infos.length > 0 ? (
        <DeckList infos={infos} />
      ) : (
        <p>Chargement des decks...</p>
      )}
    </div>
  );
}
