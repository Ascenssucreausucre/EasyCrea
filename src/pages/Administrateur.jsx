import { useLoaderData } from "react-router-dom";
import { DeckList } from "../components/DeckList";
import { useUser } from "../context/UserContext"; // Utilisation du hook personnalisé

export function Administrateur() {
  const { userData } = useUser(); // Accéder aux données utilisateur

  const infos = useLoaderData().deck;

  if (!userData) {
    return <div>Chargement...</div>; // Afficher un message ou rediriger si nécessaire
  }

  return (
    <div>
      <h1 className="title">Admin Dashboard</h1>
      <p>Affichage des decks et cartes :</p>
      {infos.length > 0 ? (
        <DeckList infos={infos} />
      ) : (
        <p>Chargement des decks...</p>
      )}
    </div>
  );
}
