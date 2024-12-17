import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";

export function Login() {
  const [formData, setFormData] = useState({
    ad_mail_createur: "",
    mdp_createur: "",
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

      // Sauvegarde du token JWT
      localStorage.setItem("token", data.token);
      console.log("Token JWT reçu :", data.token);

      alert("Connexion réussie !");
      navigate("/"); // Redirection
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ad_mail_createur" className="form-label">
              E-Mail :
            </label>
            <Input
              name="ad_mail_createur"
              type="email"
              placeholder="E-Mail"
              value={formData.ad_mail_createur}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mdp_createur" className="form-label">
              Mot de Passe :
            </label>
            <Input
              name="mdp_createur"
              type="password"
              placeholder="Mot de Passe"
              value={formData.mdp_createur}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Se connecter
          </button>
          <a href="/" className="btn btn-link text-black">
            Annuler
          </a>
        </form>
      </div>
    </>
  );
}
