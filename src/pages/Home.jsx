import React, { useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import { Deck } from "../components/Deck";
import { useLoaderData } from "react-router-dom";

async function getDeck() {
  try {
    const response = await fetch(
      `https://srochedix.alwaysdata.net/ReignApi/api/v1/decks`
    );
    const data = await response.json();

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
  const deckList = useLoaderData().decks;

  return (
    <>
      {/* <SearchBar /> */}
      <h1>Liste des Decks</h1>
      {deckList.length > 0 ? (
        <div>
          {deckList.map((deck) => (
            <Deck
              key={deck.id_deck} // Ajout de la prop `key` unique
              deck={deck}
            />
          ))}
        </div>
      ) : (
        <p>Chargement des decks...</p>
      )}
    </>
  );
}
