import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useRef } from "react";
import heart from "/src/assets/img/heart.svg";

export function Deck({ deck }) {
  const { userData } = useUser();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Si la date est vide ou invalide
    return dateString.split(" ")[0]; // Garde uniquement "YYYY-MM-DD"
  };

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
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
    }
  };

  const dialogRef = useRef(null); // Référence au <dialog>

  const handleOpenDialog = () => {
    dialogRef.current.showModal(); // Affiche le <dialog>
  };

  const handleCloseDialog = () => {
    dialogRef.current.close(); // Ferme le <dialog>
  };

  return (
    <div className="deck" key={deck.id_deck}>
      <div className="deck-content">
        <div className="deck-text">
          <h3 className="goofy">{deck.titre_deck}</h3>
          <p>
            <span>Date de début : </span>
            {formatDate(deck.date_debut)}
          </p>
          <p>
            <span>Date de fin : </span>
            {formatDate(deck.date_fin_deck)}
          </p>
          <p>
            <span>Nombre de cartes : </span>
            {deck.nb_cartes_ajoutées}/{deck.nb_cartes}
          </p>
        </div>
        <div className="deck-stats">
          <div className="nb-carte">
            <p>{deck.nb_cartes}</p>
          </div>
          <p className="nb-likes">
            {deck.nb_jaime || 0} <img className="like" src={heart} alt="" />
          </p>
        </div>
      </div>
      <div className="button-container">
        <NavLink to={`/deck/ajouter/${deck.id_deck}`} className="link">
          Ajouter une carte
        </NavLink>
        {userData && userData.userType === "administrateur" ? (
          <a className="link delete-button" onClick={handleOpenDialog}>
            Supprimer le deck
          </a>
        ) : null}
      </div>
      <dialog className="verif" ref={dialogRef}>
        <p>
          Êtes vous sûr de supprimer ce deck ? Cette action est irreversible.
        </p>
        <div className="button-container">
          <a className="link delete-button" onClick={handleDelete}>
            Supprimer le deck
          </a>
          <a className="link" onClick={handleCloseDialog}>
            Annuler
          </a>
        </div>
      </dialog>
    </div>
  );
}
