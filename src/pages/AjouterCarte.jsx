import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";
import { useEffect } from "react";

export function AjouterCarte() {
  const { id } = useParams(); // Récupère l'ID du deck depuis l'URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage

  useEffect(() => {
    if (!token) {
      alert("Vous devez être connecté pour ajouter une carte");
      navigate("/login");
      return;
    }
  }, []);

  // Etat local pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    texte_carte: "",
    valeurs_choix1_texte: "",
    valeurs_choix1_population: "",
    valeurs_choix1_finances: "",
    valeurs_choix2_texte: "",
    valeurs_choix2_population: "",
    valeurs_choix2_finances: "",
    deck_id: id, // Le deck_id est passé depuis l'URL
  });

  // Fonction pour gérer le changement des inputs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://srochedix.alwaysdata.net/ReignApi/api/v1/carte", // URL de ton API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête Authorization
          },
          body: JSON.stringify(formData), // Envoi des données du formulaire dans le corps de la requête
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

      alert("Carte créée avec succès !");
      navigate("/"); // Redirection vers la page d'accueil après succès
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Ajouter une carte</h1>
          <Input
            label="Texte de la carte"
            name="texte_carte"
            type="text"
            placeholder="Texte de la carte"
            value={formData.texte_carte}
            onChange={handleChange}
            caractereMin={50}
            caractereMax={280}
            required
          />
          <div className="choices">
            <div className="choice">
              <p>Choix 1 :</p>
              <Input
                label="Texte"
                name="valeurs_choix1_texte"
                type="text"
                placeholder="Texte du choix 1"
                value={formData.valeurs_choix1_texte}
                onChange={handleChange}
                required
              />
              <div>
                <Input
                  label="Population"
                  name="valeurs_choix1_population"
                  type="number"
                  placeholder="Population pour le choix 1"
                  value={formData.valeurs_choix1_population}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Finances"
                  name="valeurs_choix1_finances"
                  type="number"
                  placeholder="Finances pour le choix 1"
                  value={formData.valeurs_choix1_finances}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="choice">
              <p>Choix 2 :</p>
              <Input
                label="Texte"
                name="valeurs_choix2_texte"
                type="text"
                placeholder="Texte du choix 2"
                value={formData.valeurs_choix2_texte}
                onChange={handleChange}
                required
              />
              <div>
                <Input
                  label="Population"
                  name="valeurs_choix2_population"
                  type="number"
                  placeholder="Population pour le choix 2"
                  value={formData.valeurs_choix2_population}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Finances"
                  name="valeurs_choix2_finances"
                  type="number"
                  placeholder="Finances pour le choix 2"
                  value={formData.valeurs_choix2_finances}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="button">
              Ajouter la carte
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
