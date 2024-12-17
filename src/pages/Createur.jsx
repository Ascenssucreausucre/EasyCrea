import { NavBar } from "../components/Navbar";
import { useUser } from "../context/UserContext"; // Utilisation du hook personnalisé
import { useState } from "react";
import { useEffect } from "react";

export function Createur() {
  const { userData } = useUser(); // Accéder aux données utilisateur

  async function getUserCards() {
    const userId = userData?.id_createur;
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/cartes/createur/${userId}`
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
      setInfos(data); // Mise à jour de l'état avec les données récupérées
      console.log(data);
    }
    fetchData();
  }, []);

  if (!userData) {
    return <div>Chargement...</div>; // Afficher un message ou rediriger si nécessaire
  }

  return (
    <div>
      <NavBar />
      <h1>Profil du créateur</h1>
      <p>Nom du créateur: {userData.nom_createur}</p>
      {infos.length > 0 ? (
        <div>
          {infos.deck.map((deck) => (
            <div key={deck.id_deck}>
              <h3>{deck.titre_deck}</h3>
              <p>Nombre de cartes : {deck.nb_cartes}</p>
              <p>Date de début : {deck.date_debut}</p>
              <p>Date de fin : {deck.date_fin_deck}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Chargement des decks...</p>
      )}
    </div>
  );
}
