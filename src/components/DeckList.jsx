import { Deck } from "./Deck";
import { Carte } from "./Carte";
import { useState } from "react";
import { motion } from "framer-motion";

export function DeckList({ infos }) {
  const [decks, setDecks] = useState(infos); // Utilisation de l'état local pour gérer les decks

  const handleDeleteCarte = (deckId, carteId) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.id_deck === deckId
          ? {
              ...deck,
              cartes: deck.cartes.filter((carte) => carte.id_carte !== carteId),
            }
          : deck
      )
    );
  };

  const handleDeleteDeck = (deckId) => {
    setDecks((prevDecks) =>
      prevDecks.filter((deck) => deck.id_deck !== deckId)
    );
  };

  return (
    <div className="deck-list">
      {decks.map((deck) => (
        <div key={deck.id_deck} className="deck-card">
          <Deck deck={deck} onDelete={handleDeleteDeck} deckId={deck.id_deck} />
          <div className="card-list">
            {deck.cartes.map((carte) => (
              <Carte
                key={carte.id_carte}
                carte={carte}
                deckId={deck.id_deck}
                onDelete={handleDeleteCarte} // Passe la fonction de suppression au composant Carte
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
