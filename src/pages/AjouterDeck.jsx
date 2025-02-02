import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";

export function AjouterDeck() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
  const { userData } = useUser();

  useEffect(() => {
    if (!token) {
      alert("Vous devez être connecté pour ajouter un deck");
      navigate("/login");
      return;
    }
  }, []);

  // Etat local pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    titre_deck: "",
    date_debut: "",
    date_fin_deck: "",
    nb_cartes: "",
    id_administrateur: userData.id_administrateur,
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
        "https://srochedix.alwaysdata.net/ReignApi/api/v1/deck", // URL de l'API pour créer un deck
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
      alert("Deck créé avec succès, ajoutez-lui sa première carte !");
      navigate(`/deck/ajouter/${data.deck.id_deck}`);
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(`Une erreur est survenue : ${error.message}`);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Ajouter un deck</h1>
          <Input
            label="Titre du deck"
            name="titre_deck"
            type="text"
            placeholder="Titre du deck"
            value={formData.titre_deck}
            onChange={handleChange}
            required
          />
          <Input
            label="Date de début (YYYY-MM-DD)"
            name="date_debut"
            type="date"
            placeholder="Date de début"
            value={formData.date_debut}
            onChange={handleChange}
            required
          />
          <Input
            label="Date de fin (YYYY-MM-DD)"
            name="date_fin_deck"
            type="date"
            placeholder="Date de fin"
            value={formData.date_fin_deck}
            onChange={handleChange}
            required
          />
          <Input
            label="Nombre de cartes"
            name="nb_cartes"
            type="number"
            placeholder="Nombre de cartes"
            value={formData.nb_cartes}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button type="submit" className="button">
              Ajouter le deck
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
