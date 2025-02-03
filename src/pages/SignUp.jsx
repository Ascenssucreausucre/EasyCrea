import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { useFeedback } from "../context/FeedbackContext";

export function SignUp() {
  const { showFeedback } = useFeedback();
  const [formData, setFormData] = useState({
    ad_mail_createur: "",
    mdp_createur: "",
    mdp_confirm_createur: "", // Champ de confirmation du mot de passe
    nom_createur: "",
    genre: "",
    ddn: "",
  });
  const [error, setError] = useState(""); // Pour stocker l'erreur liée aux mots de passe
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les mots de passe sont identiques
    if (formData.mdp_createur !== formData.mdp_confirm_createur) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Créer un objet formData sans le champ mdp_confirm_createur
    const { mdp_confirm_createur, ...dataToSend } = formData;

    try {
      const response = await fetch(
        "https://srochedix.alwaysdata.net/ReignApi/api/v1/createur",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend), // On envoie les données sans mdp_confirm_createur
        }
      );

      const data = await response.json(); // Lire la réponse JSON

      if (!response.ok) {
        // Gérer l'erreur renvoyée par l'API
        throw new Error(
          data.error || "Erreur inconnue lors de la création du compte"
        );
      }

      // Afficher un message de succès
      showFeedback("success", "Compte créé avec succès !");
      navigate("/login"); // Redirection après succès
    } catch (error) {
      showFeedback("error", `Une erreur est survenue : ${error.message}`); // Afficher le message d'erreur
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Création d'un compte créateur</h1>

          <Input
            label="Nom d'utilisateur :"
            name="nom_createur"
            type="text"
            placeholder="Nom d'utilisateur"
            value={formData.nom_createur}
            onChange={handleChange}
            required
          />

          <Input
            label="E-Mail :"
            name="ad_mail_createur"
            type="email"
            placeholder="E-Mail"
            value={formData.ad_mail_createur}
            onChange={handleChange}
            required
          />

          <Input
            label="Mot de Passe :"
            name="mdp_createur"
            type="password"
            placeholder="Mot de Passe"
            value={formData.mdp_createur}
            onChange={handleChange}
            required
          />

          {/* Champ de confirmation du mot de passe */}
          <Input
            label="Confirmer le Mot de Passe :"
            name="mdp_confirm_createur"
            type="password"
            placeholder="Confirmer le Mot de Passe"
            value={formData.mdp_confirm_createur}
            onChange={handleChange}
            required
          />

          {/* Affichage de l'erreur si les mots de passe ne correspondent pas */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input-group">
            <label htmlFor="genre" className="form-label">
              Genre :
            </label>
            <select
              name="genre"
              className="form-select"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choisir le genre
              </option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <Input
            label="Date de naissance :"
            name="ddn"
            type="date"
            value={formData.ddn}
            onChange={handleChange}
            required
          />

          <div className="button-container">
            <button type="submit" className="button">
              Créer son compte créateur
            </button>
            <Link to={"/"} className="link">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
