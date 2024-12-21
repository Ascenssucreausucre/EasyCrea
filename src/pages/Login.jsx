import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";
import { useUser } from "../context/UserContext"; // Importer useUser

export function Login() {
  const [formData, setFormData] = useState({
    ad_mail_createur: "",
    mdp_createur: "",
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
        "https://srochedix.alwaysdata.net/ReignApi/api/v1/createur/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la connexion");
      }

      // Utiliser login pour mettre à jour le contexte utilisateur
      login(data.token);
      navigate("/"); // Redirection
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Connexion</h1>
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
          <div className="button-container">
            <button type="submit" className="button">
              Se connecter
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
