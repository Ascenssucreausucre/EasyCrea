import { NavLink } from "react-router-dom";

export function Deck({ nbCartes, nbLikes, deckTitle, idDeck }) {
  return (
    <div>
      <h2>{deckTitle}</h2>
      <p>Cartes : {nbCartes}</p>
      <p>{nbLikes !== null ? nbLikes : 0} keur</p>
      <NavLink to={`deck/ajouter/${idDeck}`}>Ajouter une carte au deck</NavLink>
    </div>
  );
}
