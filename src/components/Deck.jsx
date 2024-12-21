import { NavLink } from "react-router-dom";

export function Deck({ deck }) {
  return (
    <div className="deck" key={deck.id_deck}>
      <h3 className="goofy">{deck.titre_deck}</h3>
      <div className="stats">
        <div className="nb-carte">
          <p>{deck.nb_cartes} cartes</p>
        </div>
        <p className="nb-likes">
          {deck.nb_jaime || 0}{" "}
          <img className="like" src="/src/assets/img/heart.svg" alt="" />
        </p>
      </div>
      <p className="date">
        <span>Date de début : </span>
        {deck.date_debut}
      </p>
      <p className="date">
        <span>Date de fin : </span>
        {deck.date_fin_deck}
      </p>
      <NavLink to={`/deck/ajouter/${deck.id_deck}`}>
        Ajouter une carte au deck
      </NavLink>
    </div>
  );
}
