import { Deck } from "../components/Deck";
import { NavLink, useLoaderData } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export function DecksPage() {
  const deckList = useLoaderData().decks;
  const { userData } = useUser(); // Accéder aux données utilisateur
  const [decks, setDecks] = useState(deckList);

  const handleDeleteDeck = (deckId) => {
    setDecks((prevDecks) =>
      prevDecks.filter((deck) => deck.id_deck !== deckId)
    );
  };

  return (
    <>
      {/* <SearchBar /> */}
      <h1 className="title">Liste des Decks</h1>
      {decks.length > 0 ? (
        <div className="home-deck-list">
          {decks.map((deck) => (
            <Deck
              key={deck.id_deck} // Ajout de la prop `key` unique
              deck={deck}
              onDelete={handleDeleteDeck}
            />
          ))}
        </div>
      ) : (
        <p>Chargement des decks...</p>
      )}
      {userData && userData.userType === "administrateur" ? (
        <NavLink className="button add-button" to={"/ajouter-deck"}>
          Ajouter un deck
        </NavLink>
      ) : null}
    </>
  );
}
