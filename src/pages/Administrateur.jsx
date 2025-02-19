import { useLoaderData } from "react-router-dom";
import { DeckList } from "../components/DeckList";
import { useUser } from "../context/UserContext"; // Utilisation du hook personnalisé

export function Administrateur() {
  const { userData } = useUser(); // Accéder aux données utilisateur

  if (userData.userType !== "administrateur") {
    return (
      <div>
        <p>Vous n'avez pas le droit d'accéder à cette page.</p>
      </div>
    );
  }

  const infos = useLoaderData().deck;

  if (!userData) {
    return <div>Chargement...</div>; // Afficher un message ou rediriger si nécessaire
  }

  return (
    <div className="admin-dashboard">
      <h1 className="title">Admin Dashboard</h1>
      <p>Panneau d'administration des decks</p>
      {infos.length > 0 ? (
        <DeckList infos={infos} dashboard={true} />
      ) : (
        <p>Chargement des decks...</p>
      )}
    </div>
  );
}
