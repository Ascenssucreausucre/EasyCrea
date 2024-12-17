import React, { useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import { Deck } from "../components/Deck";

async function getDeck() {
  try {
    const response = await fetch(
      `https://srochedix.alwaysdata.net/ReignApi/api/v1/decks`
    );
    const data = await response.json();

    console.log(data.decks);

    // Assure-toi que "data" contient bien une liste
    if (data && Array.isArray(data.decks)) {
      return data.decks; // Retourner la liste correcte
    } else {
      console.error("Données inattendues:", data);
      return []; // Retourner un tableau vide si la structure est incorrecte
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des decks:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

export function Home() {
  const [deckList, setDeckList] = useState([]); // État pour stocker les données récupérées

  useEffect(() => {
    // Appel de la fonction getDeck lorsque le composant est monté
    async function fetchData() {
      const data = await getDeck();
      setDeckList(data); // Mise à jour de l'état avec les données récupérées
    }

    fetchData();
  }, []); // Le tableau vide signifie que l'effet s'exécute une seule fois au montage

  return (
    <>
      <NavBar></NavBar>
      <h1>Liste des Decks</h1>
      {deckList.length > 0 ? (
        <div>
          {deckList.map((deck) => (
            <Deck
              nbCartes={deck.nb_cartes}
              nbLikes={deck.nb_jaime}
              deckTitle={deck.titre_deck}
            /> // Assure-toi d'afficher un champ existant
          ))}
        </div>
      ) : (
        <p>Chargement des decks...</p>
      )}
    </>
  );
}
