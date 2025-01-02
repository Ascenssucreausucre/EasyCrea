import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function Deck({ deck }) {
  const { userData } = useUser();
  const token = localStorage.getItem("token");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/decks/${deck.id_deck}`, // URL de l'API pour créer un deck
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête Authorization
          },
        }
      );

      // Vérifier si la réponse est correcte (statut 200 ou 201)
      if (!response.ok) {
        throw new Error("Erreur de requête. Statut HTTP: " + response.status);
      }

      // Essayer de lire la réponse en JSON
      const responseText = await response.text(); // Afficher la réponse brute pour analyser son contenu
      const data = responseText ? JSON.parse(responseText) : {};

      if (!data) {
        throw new Error("La réponse de l'API est vide ou mal formatée.");
      }

      alert("Deck supprimé avec succès !");
      navigate("/"); // Redirection vers la page d'accueil après succès
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
    }
  };

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
      <div className="button-container">
        <NavLink to={`/deck/ajouter/${deck.id_deck}`} className="link">
          Ajouter une carte au deck
        </NavLink>
        {userData && userData.userType === "administrateur" ? (
          <a className="link delete-button" onClick={handleDelete}>
            Supprimer le deck
          </a>
        ) : null}
      </div>
    </div>
  );
}
