// Composant Carte
const Carte = ({ texte_carte }) => {
    return <h3>{texte_carte}</h3>;
  };
  
  // Composant Deck
  const Deck = ({ deck }) => {
    return (
      <div key={deck.id_deck}>
        <h3>{deck.titre_deck}</h3>
        <p>Nombre de cartes : {deck.nb_cartes}</p>
        <p>Date de début : {deck.date_debut}</p>
        <p>Date de fin : {deck.date_fin_deck}</p>
        <div>
          {deck.cartes.map((carte) => (
            <Carte key={carte.id_carte} texte_carte={carte.texte_carte} />
          ))}
        </div>
      </div>
    );
  };
  
  // Composant Principal
  export function DeckList({ infos }){
    return (
      <div>
        {infos.map((deck) => (
          <Deck key={deck.id_deck} deck={deck} />
        ))}
      </div>
    );
  };