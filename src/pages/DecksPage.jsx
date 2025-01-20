import { Deck } from "../components/Deck";
import { NavLink, useLoaderData } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function DecksPage() {
  const deckList = useLoaderData().decks;
  const { userData } = useUser(); // Accéder aux données utilisateur

  return (
    <>
      {/* <SearchBar /> */}
      <h1 className="title">Liste des Decks</h1>
      {deckList.length > 0 ? (
        <div className="home-deck-list">
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
      {userData && userData.userType === "administrateur" ? (
        <NavLink className="button add-button" to={"/ajouter-deck"}>
          Ajouter un deck
        </NavLink>
      ) : null}
    </>
  );
}
