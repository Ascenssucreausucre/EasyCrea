import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";

export function AjouterCarte() {
  const { id } = useParams(); // Récupère l'ID du deck depuis l'URL
  const navigate = useNavigate();

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

  const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage

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

    // Vérification du token
    if (!token) {
      alert("Vous devez être connecté pour soumettre ce formulaire.");
      navigate("/login");
      return;
    }

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
      console.log(formData);

      // Vérifier si la réponse est correcte (statut 200 ou 201)
      if (!response.ok) {
        console.log(response);
        throw new Error("Erreur de requête. Statut HTTP: " + response.status);
      }

      // Essayer de lire la réponse en JSON
      const responseText = await response.text();
      console.log(responseText); // Afficher la réponse brute pour analyser son contenu

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
      <NavBar />
      <div className="container mt-4">
        <h1>Ajouter une carte</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Texte de la carte"
            name="texte_carte"
            type="text"
            placeholder="Texte de la carte"
            value={formData.texte_carte}
            onChange={handleChange}
            required
          />

          <Input
            label="Choix 1 - Texte"
            name="valeurs_choix1_texte"
            type="text"
            placeholder="Texte du choix 1"
            value={formData.valeurs_choix1_texte}
            onChange={handleChange}
            required
          />

          <Input
            label="Choix 1 - Population"
            name="valeurs_choix1_population"
            type="number"
            placeholder="Population pour le choix 1"
            value={formData.valeurs_choix1_population}
            onChange={handleChange}
            required
          />

          <Input
            label="Choix 1 - Finances"
            name="valeurs_choix1_finances"
            type="number"
            placeholder="Finances pour le choix 1"
            value={formData.valeurs_choix1_finances}
            onChange={handleChange}
            required
          />

          <Input
            label="Choix 2 - Texte"
            name="valeurs_choix2_texte"
            type="text"
            placeholder="Texte du choix 2"
            value={formData.valeurs_choix2_texte}
            onChange={handleChange}
            required
          />

          <Input
            label="Choix 2 - Population"
            name="valeurs_choix2_population"
            type="number"
            placeholder="Population pour le choix 2"
            value={formData.valeurs_choix2_population}
            onChange={handleChange}
            required
          />

          <Input
            label="Choix 2 - Finances"
            name="valeurs_choix2_finances"
            type="number"
            placeholder="Finances pour le choix 2"
            value={formData.valeurs_choix2_finances}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary">
            Ajouter la carte
          </button>
          <a href="/" className="btn btn-link text-black">
            Annuler
          </a>
        </form>
      </div>
    </>
  );
}
