import { useState } from "react";
import { Input } from "./Input";
import { useRef } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";

export function Carte({ carte, cardTitle, onDelete, deckId, dashboard }) {
  const [isEditable, setIsEditable] = useState(false); // État pour gérer le mode
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user-data")); // Accéder aux données utilisateur
  const navigate = useNavigate();
  const { showFeedback } = useFeedback();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  });

  // État local pour gérer les valeurs modifiables
  const [formData, setFormData] = useState({
    texte_carte: carte.texte_carte,
    valeurs_choix1_texte: carte.valeurs_choix1.texte,
    valeurs_choix1_population: carte.valeurs_choix1.population,
    valeurs_choix1_finances: carte.valeurs_choix1.finances,
    valeurs_choix2_texte: carte.valeurs_choix2.texte,
    valeurs_choix2_population: carte.valeurs_choix2.population,
    valeurs_choix2_finances: carte.valeurs_choix2.finances,
  });

  useEffect(() => {
    setFormData({
      texte_carte: carte.texte_carte,
      valeurs_choix1_texte: carte.valeurs_choix1.texte,
      valeurs_choix1_population: carte.valeurs_choix1.population,
      valeurs_choix1_finances: carte.valeurs_choix1.finances,
      valeurs_choix2_texte: carte.valeurs_choix2.texte,
      valeurs_choix2_population: carte.valeurs_choix2.population,
      valeurs_choix2_finances: carte.valeurs_choix2.finances,
    });
  }, [carte]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditable(true); // Activer le mode modifiable
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/cartes/${carte.id_carte}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Lire la réponse brute
      const responseText = await response.text();

      // Tenter de parser la réponse en JSON
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error("Erreur de parsing JSON :", e);
        throw new Error("La réponse de l'API est mal formatée.");
      }

      // Vérifier si la requête a échoué
      if (!response.ok) {
        console.error("Erreur capturée depuis l'API :", data);
        throw new Error(data.error || "Une erreur inconnue s'est produite.");
      }

      // Si tout est bon, afficher un message de succès et exécuter la suppression locale
      handleCloseDialog();
      showFeedback("success", "Carte supprimée avec succès !");
      onDelete(deckId, carte.id_carte);
    } catch (error) {
      console.error("Erreur capturée :", error.message);
      showFeedback("error", `Une erreur est survenue : ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    setIsEditable(false); // Sauvegarder et désactiver le mode modifiable
    e.preventDefault();

    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/cartes/${carte.id_carte}`, // URL de l'API
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête Authorization
          },
          body: JSON.stringify(formData), // Envoi des données du formulaire dans le corps de la requête
        }
      );

      // Lire la réponse brute
      const responseText = await response.text();

      // Tenter de parser la réponse en JSON
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        throw new Error("La réponse de l'API est mal formatée.");
      }

      // Vérifier si la requête a échoué
      if (!response.ok) {
        throw new Error(data.error || "Une erreur inconnue s'est produite.");
      }

      // Tout est bon, afficher un message de succès ou effectuer d'autres actions nécessaires
      showFeedback("success", "Carte mise à jour avec succès !");
    } catch (error) {
      showFeedback("error", `Une erreur est survenue : ${error.message}`);
    }
  };

  const dialogRef = useRef(null); // Référence au <dialog>

  const handleOpenDialog = () => {
    dialogRef.current.showModal(); // Affiche le <dialog>
  };

  const handleCloseDialog = () => {
    dialogRef.current.close(); // Ferme le <dialog>
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({
      texte_carte: carte.texte_carte,
      valeurs_choix1_texte: carte.valeurs_choix1.texte,
      valeurs_choix1_population: carte.valeurs_choix1.population,
      valeurs_choix1_finances: carte.valeurs_choix1.finances,
      valeurs_choix2_texte: carte.valeurs_choix2.texte,
      valeurs_choix2_population: carte.valeurs_choix2.population,
      valeurs_choix2_finances: carte.valeurs_choix2.finances,
    });
    setIsEditable(false);
  };

  return (
    <div className="carte">
      <form>
        {dashboard ? (
          carte.id_createur ? (
            <h2 className="title">
              Créée par{" "}
              <NavLink
                to={`/createur/${carte.id_createur}`}
                className="title-link"
              >
                {carte.createur.nom_createur}
              </NavLink>
            </h2>
          ) : (
            <h2 className="title">Carte Admin</h2>
          )
        ) : (
          <h2 className="title">{cardTitle}</h2>
        )}

        <Input
          label="Texte de la carte"
          name="texte_carte"
          type="textarea"
          placeholder="Texte de la carte"
          value={formData.texte_carte}
          onChange={handleChange}
          disabled={!isEditable} // Champs désactivé en mode lecture seule
          caractereMin={50}
          caractereMax={280}
          required
        />

        <div className="choices">
          <div className="choice">
            <p>Choix 1</p>
            <Input
              label="Texte"
              name="valeurs_choix1_texte"
              type="textarea"
              placeholder="Texte du choix 1"
              value={formData.valeurs_choix1_texte}
              onChange={handleChange}
              disabled={!isEditable}
              required
            />
            <div>
              <Input
                label="Population"
                name="valeurs_choix1_population"
                type="tel"
                pattern="-?[0-9]+"
                numberMin={-15}
                numberMax={15}
                placeholder="Population pour le choix 1"
                value={formData.valeurs_choix1_population}
                onChange={handleChange}
                disabled={!isEditable}
                required
              />
              <Input
                label="Finances"
                name="valeurs_choix1_finances"
                type="tel"
                pattern="-?[0-9]+"
                numberMin={-15}
                numberMax={15}
                placeholder="Finances pour le choix 1"
                value={formData.valeurs_choix1_finances}
                onChange={handleChange}
                disabled={!isEditable}
                required
              />
            </div>
          </div>

          <div className="choice">
            <p>Choix 2</p>
            <Input
              label="Texte"
              name="valeurs_choix2_texte"
              type="textarea"
              placeholder="Texte du choix 2"
              value={formData.valeurs_choix2_texte}
              onChange={handleChange}
              disabled={!isEditable}
              required
            />
            <div>
              <Input
                label="Population"
                name="valeurs_choix2_population"
                type="tel"
                pattern="-?[0-9]+"
                numberMin={-15}
                numberMax={15}
                placeholder="Population pour le choix 2"
                value={formData.valeurs_choix2_population}
                onChange={handleChange}
                disabled={!isEditable}
                required
              />
              <Input
                label="Finances"
                name="valeurs_choix2_finances"
                type="tel"
                pattern="-?[0-9]+"
                numberMin={-15}
                numberMax={15}
                placeholder="Finances pour le choix 2"
                value={formData.valeurs_choix2_finances}
                onChange={handleChange}
                disabled={!isEditable}
                required
              />
            </div>
          </div>
        </div>
        {userData && userData.userType === "administrateur" && onDelete ? (
          <div className="button-container">
            {isEditable ? (
              <>
                <a className="link" onClick={handleCancel}>
                  Annuler
                </a>
                <button type="button" className="button" onClick={handleSubmit}>
                  Sauvegarder
                </button>
              </>
            ) : (
              <>
                <a className="link delete-button" onClick={handleOpenDialog}>
                  Supprimer
                </a>
                <button className="button" onClick={handleEditClick}>
                  Modifier
                </button>
              </>
            )}
          </div>
        ) : null}
      </form>
      <dialog className="verif" ref={dialogRef}>
        <p>
          Êtes vous sûr de supprimer cette carte ? Cette action est
          irreversible.
        </p>
        <div className="button-container">
          <a className="link" onClick={handleCloseDialog}>
            Annuler
          </a>
          <a className="link delete-button" onClick={handleDelete}>
            Supprimer la carte
          </a>
        </div>
      </dialog>
    </div>
  );
}
