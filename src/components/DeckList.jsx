import { Deck } from "./Deck";
import { Carte } from "./Carte";
import { useState } from "react";
import { Searchbar } from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";

export function DeckList({ infos, dashboard }) {
  const [decks, setDecks] = useState(infos); // Utilisation de l'état local pour gérer les decks
  const [searchItem, setSearchItem] = useState("");

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

  // Fonction pour basculer la visibilité des cartes d'un deck spécifique
  const toggleCardsVisibility = (deckId) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.id_deck === deckId
          ? { ...deck, showCards: !deck.showCards } // Inverse l'état de la visibilité pour ce deck
          : deck
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value.toLowerCase());
  };

  // Filtrer les decks en fonction de la recherche
  const filteredDecks = decks.filter((deck) =>
    deck.titre_deck.toLowerCase().includes(searchItem)
  );

  return (
    <div className="deck-list">
      <Searchbar
        searchItem={searchItem}
        onSearchItemChange={handleSearchChange}
      />
      <AnimatePresence>
        {filteredDecks.map((deck) => (
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
              <button
                onClick={() => toggleCardsVisibility(deck.id_deck)}
                className="button smaller-button"
              >
                {deck.showCards ? "Masquer les cartes" : "Afficher les cartes"}
              </button>
              <div
                className={deck.showCards ? "card-list active" : "card-list"}
              >
                <AnimatePresence>
                  {deck.showCards &&
                    deck.cartes.map((carte) => (
                      <>
                        <motion.div
                          key={carte.id_carte}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <Carte
                            carte={carte}
                            deckId={deck.id_deck}
                            onDelete={handleDeleteCarte}
                            dashboard={dashboard}
                            cardTitle="Ma carte"
                          />
                        </motion.div>
                        {/* Vérifier si la carte a une random_carte et l'afficher */}
                        {!dashboard && carte.random_carte && (
                          <motion.div
                            key={carte.id_carte}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                              duration: 0.1,
                              ease: "easeOut",
                            }}
                          >
                            <Carte
                              carte={carte.random_carte}
                              deckId={deck.id_deck}
                              dashboard={dashboard}
                              cardTitle="Carte Aléatoire"
                            />
                          </motion.div>
                        )}
                      </>
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
