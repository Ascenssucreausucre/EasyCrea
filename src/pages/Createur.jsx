import { useParams } from "react-router-dom";
import { DeckList } from "../components/DeckList";
import { useState, useEffect } from "react";

export function Createur() {
  const userId = useParams().id;
  const [infos, setInfos] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      const data = await getUserCards();
      setInfos(data); // Mise à jour de l'état avec les données récupérées
    }
    fetchData();
  }, []); // Déclenche seulement lorsque userData change

  return (
    <div>
      <h1 className="title">
        {infos.length > 0
          ? "Profil de " + infos[0].cartes[0].createur.nom_createur
          : null}
      </h1>
      {infos.length > 0 ? (
        <DeckList infos={infos} />
      ) : (
        <p>Cet utilisateur n'a participé à aucun deck.</p>
      )}
    </div>
  );
}
