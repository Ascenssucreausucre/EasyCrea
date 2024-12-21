import { NavLink } from "react-router-dom";

export function Deck({ deck }) {
  return (
    <div className="deck" key={deck.id_deck}>
      <h3>{deck.titre_deck}</h3>
      <p>Nombre de cartes : {deck.nb_cartes}</p>
      <p>Date de début : {deck.date_debut}</p>
      <p>Date de fin : {deck.date_fin_deck}</p>
      <NavLink to={`deck/ajouter/${deck.deck_id}`}>
        Ajouter une carte au deck
      </NavLink>
    </div>
  );
}
