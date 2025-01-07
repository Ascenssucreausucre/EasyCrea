// Composant Carte
import { Deck } from "./Deck";
import { Carte } from "./Carte";

// Composant Principal
export function DeckList({ infos }) {
  return (
    <div className="deck-list">
      {infos.map((deck) => (
        <div key={deck.id_deck} className="deck-card">
          <Deck deck={deck} />
          <div className="card-list">
            {deck.cartes.map((carte) => (
              <Carte key={carte.id_carte} carte={carte} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
