import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";

export function SignUp() {
  const [formData, setFormData] = useState({
    ad_mail_createur: "",
    mdp_createur: "",
    nom_createur: "",
    genre: "",
    ddn: "",
  });
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
    try {
      const response = await fetch(
        "https://srochedix.alwaysdata.net/ReignApi/api/v1/createur",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json(); // Lire la réponse JSON

      if (!response.ok) {
        // Gérer l'erreur renvoyée par l'API
        throw new Error(
          data.error || "Erreur inconnue lors de la création du compte"
        );
      }

      console.log("Succès :", data);

      // Afficher un message de succès
      alert("Compte créé avec succès !");
      navigate("/login"); // Redirection après succès
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`); // Afficher le message d'erreur
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
            <a href="/" className="link">
              Annuler
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
