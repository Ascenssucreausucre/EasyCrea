import { Deck } from "./Deck";
import { Carte } from "./Carte";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DeckList({ infos, dashboard }) {
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
      <AnimatePresence>
        {" "}
        {/* Entoure les decks avec AnimatePresence */}
        {decks.map((deck) => (
          <motion.div
            key={deck.id_deck}
            initial={{ opacity: 1 }} // L'état initial du deck est visible
            animate={{ opacity: 1 }} // Pendant l'animation, le deck reste visible
            exit={{ opacity: 0, x: 100 }} // Lors de la suppression, l'opacité devient 0
            transition={{ duration: 0.3 }} // Durée de l'animation de disparition
          >
            <div className="deck-card">
              <Deck
                deck={deck}
                onDelete={handleDeleteDeck}
                deckId={deck.id_deck}
              />
              <div className="card-list">
                <AnimatePresence>
                  {" "}
                  {/* Entoure les cartes avec AnimatePresence pour la suppression */}
                  {deck.cartes.map((carte) => (
                    <motion.div
                      key={carte.id_carte}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Carte
                        carte={carte}
                        deckId={deck.id_deck}
                        onDelete={handleDeleteCarte}
                        dashboard={dashboard}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
