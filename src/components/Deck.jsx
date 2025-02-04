import { NavLink } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";
import { useRef, useState } from "react";
import heart from "/src/assets/img/heart.svg";

export function Deck({ deck, onDelete, deckId, onUpdateStatus }) {
  const userData = JSON.parse(localStorage.getItem("user-data"));
  const token = localStorage.getItem("token");
  const { showFeedback } = useFeedback();
  const [deckData, setDeckData] = useState(deck);
  const [feedback, setFeedback] = useState(null); // Etat pour gérer le feedback (type et message)

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Si la date est vide ou invalide
    return dateString.split(" ")[0]; // Garde uniquement "YYYY-MM-DD"
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/decks/${deckData.id_deck}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: deckData.status,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur inconnue");
      }

      showFeedback("success", "Status changé avec succès !");
      onUpdateStatus
        ? onUpdateStatus(deckData.id_deck, deckData.status, deck.status)
        : null;
    } catch (error) {
      console.error("Erreur :", error.message);
      showFeedback("error", `Une erreur est survenue : ${error.message}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/decks/${deckData.id_deck}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur de requête. Statut HTTP: " + response.status);
      }

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!data) {
        throw new Error("La réponse de l'API est vide ou mal formatée.");
      }

      onDelete(deckId);
      showFeedback("success", "Deck supprimé avec succès !");
      handleCloseDialog();
    } catch (error) {
      console.error("Erreur :", error.message);
      showFeedback("error", `Une erreur est survenue : ${error.message}`);
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
    <>
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
            {/* <div className="nb-carte">
              <p>{deckData.nb_cartes}</p>
            </div> */}
            {/* <p className="nb-likes">
              {deckData.nb_jaime || 0}{" "}
              <img className="like" src={heart} alt="" />
            </p> */}
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
                <button
                  className="button smaller-button"
                  onClick={handleUpdate}
                >
                  Submit
                </button>
              </div>
            ) : (
              <p className={deckData.status + " deck-status"}>
                {deckData.status}
              </p>
            )}
          </div>
        </div>
        <div
          className={
            userData && userData.userType === "administrateur"
              ? "button-container"
              : "reverse button-container"
          }
        >
          {userData && userData.userType === "administrateur" ? (
            <a className="link delete-button" onClick={handleOpenDialog}>
              Supprimer le deck
            </a>
          ) : null}
          {deckData.status === "WIP" &&
          parseInt(deckData.nb_cartes_atm) <= parseInt(deckData.nb_cartes) ? (
            <NavLink to={`/deck/ajouter/${deckData.id_deck}`} className="link">
              Ajouter une carte
            </NavLink>
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
      {/* Affichage du Feedback si présent */}
      {feedback && (
        <Feedback
          success={feedback.type === "success" ? feedback.message : null}
          error={feedback.type === "error" ? feedback.message : null}
        />
      )}
    </>
  );
}
