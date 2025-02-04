import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { useEffect } from "react";
import { Carte } from "../components/Carte";
import { useFeedback } from "../context/FeedbackContext";

export function AjouterCarte() {
  const { id } = useParams(); // Récupère l'ID du deck depuis l'URL
  const { showFeedback } = useFeedback();
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
  const userData = JSON.parse(localStorage.getItem("user-data"));
  const [randomCard, setRandomCard] = useState(
    userData && userData.userType === "administrateur"
      ? null
      : {
          id_carte: "",
          texte_carte: "Chargement...",
          valeurs_choix1: {
            texte: "",
            population: "",
            finances: "",
          },
          valeurs_choix2: {
            texte: "",
            population: "",
            finances: "",
          },
          date_soumission: "",
          ordre_soumission: "",
          id_administrateur: "",
          id_createur: "",
          id_deck: "",
        }
  ); // État pour la carte aléatoire

  useEffect(() => {
    if (!token) {
      alert("Vous devez être connecté pour ajouter une carte");
      navigate("/login");
      return;
    }
    userData.userType === "administrateur" ? null : getRandomCard();
  }, []);

  const getRandomCard = async () => {
    try {
      const response = await fetch(
        `https://srochedix.alwaysdata.net/ReignApi/api/v1/carte/aleatoire/deck/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Vérifier si la requête a échoué
      if (!response.ok) {
        const responseText = await response.text(); // Récupérer la réponse brute
        let errorMessage = `Erreur de requête. Statut HTTP: ${response.status}`;

        try {
          const errorData = JSON.parse(responseText); // Essayer de parser la réponse
          if (errorData?.error) {
            errorMessage = errorData.error; // Si un message d'erreur est retourné
          }
        } catch (e) {
          // Si la réponse n'est pas un JSON valide, on garde l'erreur générique
        }

        throw new Error(errorMessage); // Lever l'erreur avec le message approprié
      }

      // Convertir la réponse en JSON
      const data = await response.json();

      // Vérifier que la carte existe dans la réponse
      if (!data || !data.card) {
        throw new Error("La carte aléatoire est introuvable dans la réponse.");
      }

      // Extraire la carte aléatoire
      const randomCard = data.card;

      // Mettre à jour l'état local avec la carte aléatoire
      setRandomCard(randomCard);
    } catch (error) {
      // Afficher un message d'erreur via showFeedback
      showFeedback(
        "error",
        `Une erreur est survenue lors du chargement de la carte aléatoire: ${error.message}`
      );
    }
  };

  // Etat local pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    texte_carte: "",
    valeurs_choix1_texte: "",
    valeurs_choix1_population: "",
    valeurs_choix1_finances: "",
    valeurs_choix2_texte: "",
    valeurs_choix2_population: "",
    valeurs_choix2_finances: "",
    id_deck: id, // Le deck_id est passé depuis l'URL
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

      // Lire la réponse brute
      const responseText = await response.text();

      // Tenter de parser la réponse en JSON
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        throw new Error("La réponse de l'API est mal formatée.");
      }

      // Vérifier si la requête a échoué (par exemple, erreur 409 ou autre)
      if (!response.ok) {
        const errorMessage =
          data.error || `Une erreur inconnue s'est produite.`;
        throw new Error(errorMessage);
      }

      // Tout est bon, afficher un message de succès
      showFeedback("success", "Carte ajoutée avec succès !");

      // Redirection vers la page d'accueil après succès
      navigate("/");
    } catch (error) {
      // Si une erreur survient, afficher un message d'erreur spécifique
      console.error(error);
      showFeedback("error", `Une erreur est survenue : ${error.message}`);
    }
  };

  return (
    <>
      <div>
        {randomCard ? (
          <Carte carte={randomCard} cardTitle="Carte Aléatoire" />
        ) : null}
        <form onSubmit={handleSubmit}>
          <h1 className="title">Ajouter une carte</h1>
          <Input
            label="Texte de la carte"
            name="texte_carte"
            type="textarea"
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
                type="textarea"
                placeholder="Texte du choix 1"
                value={formData.valeurs_choix1_texte}
                onChange={handleChange}
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
                  required
                />
              </div>
            </div>
            <div className="choice">
              <p>Choix 2 :</p>
              <Input
                label="Texte"
                name="valeurs_choix2_texte"
                type="textarea"
                placeholder="Texte du choix 2"
                value={formData.valeurs_choix2_texte}
                onChange={handleChange}
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
                  required
                />
              </div>
            </div>
          </div>
          <p>Choix et finances doivent être compris entre 15 et -15</p>
          <div className="button-container">
            <button type="submit" className="button">
              Ajouter la carte
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
