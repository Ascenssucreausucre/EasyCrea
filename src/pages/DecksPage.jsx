import { Deck } from "../components/Deck";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export function DecksPage() {
  const navigate = useNavigate();
  const deckList = useLoaderData().decks;
  const { userData } = useUser(); // Accéder aux données utilisateur
  const [decks, setDecks] = useState(deckList);

  const handleStatusUpdate = (deckId, newStatus, oldStatus) => {
    setDecks((prevDecks) => {
      // 1️⃣ Copier l'état actuel
      const updatedDecks = { ...prevDecks };

      // 2️⃣ Trouver le deck à déplacer
      const deckToMove = updatedDecks[oldStatus].find(
        (deck) => deck.id_deck === deckId
      );
      if (!deckToMove) return prevDecks; // Si le deck n'existe pas, ne rien faire

      // 3️⃣ Retirer le deck de son ancien tableau
      updatedDecks[oldStatus] = updatedDecks[oldStatus].filter(
        (deck) => deck.id_deck !== deckId
      );

      // 4️⃣ Modifier son statut
      deckToMove.status = newStatus;

      // 5️⃣ Ajouter le deck dans le nouveau tableau
      updatedDecks[newStatus] = [...updatedDecks[newStatus], deckToMove];

      // 6️⃣ Mettre à jour l'état avec la nouvelle version des decks
      return updatedDecks;
    });
  };

  const handleDeleteDeck = (deckId) => {
    setDecks((prevDecks) =>
      prevDecks.filter((deck) => deck.id_deck !== deckId)
    );
  };

  function toAddDeck() {
    navigate("/ajouter-deck");
  }

  if (decks.WIP)
    return (
      <>
        {/* <SearchBar /> */}
        <h1 className="goofy">Liste des Decks</h1>
        <section className="deck-status-section">
          <h2 className="title">Deck Actif</h2>
          {decks.WIP.length > 0 ? (
            <div className="home-deck-list">
              {decks.WIP.map((deck) => (
                <Deck
                  key={deck.id_deck} // Ajout de la prop `key` unique
                  deck={deck}
                  onDelete={handleDeleteDeck}
                  onUpdateStatus={handleStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <p>Chargement des decks...</p>
          )}
          {userData && userData.userType === "administrateur" ? (
            <button className="button add-button" onClick={toAddDeck}>
              Ajouter un deck
            </button>
          ) : null}
        </section>
        <section className="deck-status-section">
          <h2 className="title">Decks Jouable</h2>
          {decks.Playable.length > 0 ? (
            <div className="home-deck-list">
              {decks.Playable.map((deck) => (
                <Deck
                  key={deck.id_deck} // Ajout de la prop `key` unique
                  deck={deck}
                  onDelete={handleDeleteDeck}
                  onUpdateStatus={handleStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <p>Aucun deck jouable pour le moment.</p>
          )}
        </section>
        <section className="deck-status-section">
          <h2 className="title">Decks en cours d'approbation</h2>
          {decks.Pending.length > 0 ? (
            <div className="home-deck-list">
              {decks.Pending.map((deck) => (
                <Deck
                  key={deck.id_deck} // Ajout de la prop `key` unique
                  deck={deck}
                  onDelete={handleDeleteDeck}
                  onUpdateStatus={handleStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <p>Aucun deck en cours d'approbation</p>
          )}
        </section>
      </>
    );

  return (
    <>
      <h1 className="goofy">Liste des Decks</h1>
      <section className="deck-status-section">
        <h2 className="title">Decks Jouables</h2>
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
        <p>
          Créez-vous un compte pour voir les decks actifs et y ajouter des
          cartes !
        </p>
      </section>
    </>
  );
}
