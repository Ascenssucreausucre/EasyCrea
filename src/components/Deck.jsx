import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import heart from "/src/assets/img/heart.svg";

export function Deck({ deck, onDelete, deckId }) {
  const userData = JSON.parse(localStorage.getItem("user-data"));
  const token = localStorage.getItem("token");
  const [deckData, setDeckData] = useState(deck);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Si la date est vide ou invalide
    return dateString.split(" ")[0]; // Garde uniquement "YYYY-MM-DD"
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/decks/${deckData.id_deck}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête Authorization
          },
          body: JSON.stringify(deckData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/decks/${deckData.id_deck}`, // URL de l'API pour créer un deck
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
      onDelete(deckId);
      handleCloseDialog();
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeckData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dialogRef = useRef(null); // Référence au <dialog>

  const handleOpenDialog = () => {
    dialogRef.current.showModal(); // Affiche le <dialog>
  };

  const handleCloseDialog = () => {
    dialogRef.current.close(); // Ferme le <dialog>
  };
  return (
    <div className="deck" key={deckData.id_deck}>
      <div className="deck-content">
        <div className="deck-text">
          <h3 className="goofy">{deckData.titre_deck}</h3>
          <p>
            <span>Date de début : </span>
            {formatDate(deckData.date_debut)}
          </p>
          <p>
            <span>Date de fin : </span>
            {formatDate(deckData.date_fin_deck)}
          </p>
          <p>
            <span>Nombre de cartes : </span>
            {deckData.nb_cartes_atm}/{deck.nb_cartes}
          </p>
        </div>
        <div className="deck-stats">
          <div className="nb-carte">
            <p>{deckData.nb_cartes}</p>
          </div>
          <p className="nb-likes">
            {deckData.nb_jaime || 0} <img className="like" src={heart} alt="" />
          </p>
          {userData && userData.userType === "administrateur" ? (
            <div className="status">
              <select
                name="status"
                className="form-select"
                value={deckData.status}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="Planned">Planned</option>
                <option value="WIP">WIP</option>
                <option value="Pending">Pending</option>
                <option value="Playable">Playable</option>
              </select>
              <button className="button smaller-button" onClick={handleUpdate}>
                Submit
              </button>
            </div>
          ) : (
            <p className="deck-status">{deckData.status}</p>
          )}
        </div>
      </div>
      <div className="button-container">
        <NavLink to={`/deck/ajouter/${deckData.id_deck}`} className="link">
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
