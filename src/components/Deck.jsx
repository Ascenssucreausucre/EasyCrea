export function Deck({ nbCartes, nbLikes, deckTitle }) {
  return (
    <div>
      <h2>{deckTitle}</h2>
      <p>Cartes : {nbCartes}</p>
      <p>{nbLikes !== null ? nbLikes : 0} keur</p>
    </div>
  );
}
