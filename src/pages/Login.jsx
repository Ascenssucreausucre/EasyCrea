import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { useUser } from "../context/UserContext"; // Importer useUser
import { useFeedback } from "../context/FeedbackContext";

export function Login() {
  const { showFeedback } = useFeedback();
  const [formData, setFormData] = useState({
    ad_mail: "",
    mdp: "",
  });

  const { login } = useUser(); // Utilise login pour mettre à jour le contexte
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
        "https://srochedix.alwaysdata.net/ReignApi/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Essayer de lire la réponse en JSON
      let data = {};
      try {
        const responseText = await response.text(); // Lire la réponse en texte
        data = responseText ? JSON.parse(responseText) : {}; // Tenter de parser la réponse
      } catch (e) {
        // Si la réponse n'est pas un JSON valide, afficher un message générique
        throw new Error("La réponse de l'API est mal formatée.");
      }

      // Vérifier si la réponse est correcte
      if (!response.ok) {
        // Si la réponse n'est pas OK, utiliser l'erreur retournée par l'API (si présente)
        throw new Error(data.error || "Erreur lors de la connexion");
      }

      // Si tout est OK, utiliser le token pour mettre à jour le contexte utilisateur
      login(data.token);
      navigate("/"); // Redirection vers la page d'accueil
    } catch (error) {
      // Afficher un message d'erreur via showFeedback
      showFeedback("error", `Une erreur est survenue : ${error.message}`);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Connexion</h1>
          <Input
            label="E-Mail :"
            name="ad_mail"
            type="email"
            placeholder="E-Mail"
            value={formData.ad_mail_createur}
            onChange={handleChange}
            required
          />
          <Input
            label="Mot de Passe :"
            name="mdp"
            type="password"
            placeholder="Mot de Passe"
            value={formData.mdp_createur}
            onChange={handleChange}
            required
          />
          <p>
            Vous n'avez pas encore de compte ?{" "}
            <Link to={"/sign-up"} className="link no-account">
              Inscrivez-vous !
            </Link>
          </p>
          <div className="button-container">
            <Link to={"/"} className="link">
              Annuler
            </Link>
            <button type="submit" className="button">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
