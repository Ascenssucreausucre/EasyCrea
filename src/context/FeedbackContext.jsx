// FeedbackContext.js
import React, { createContext, useContext, useState } from "react";

// Crée le contexte pour le feedback
const FeedbackContext = createContext();

// Fournisseur du contexte
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(null);

  // Fonction pour afficher un message de feedback
  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000); // Efface le feedback après 3 secondes
  };

  return (
    <FeedbackContext.Provider value={{ feedback, showFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Hook pour utiliser le contexte dans n'importe quel composant
export const useFeedback = () => useContext(FeedbackContext);
