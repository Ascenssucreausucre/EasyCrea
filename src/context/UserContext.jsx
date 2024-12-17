// src/context/UserContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Créer un contexte
const UserContext = createContext();

// Créer un provider pour ce contexte
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Lire le token depuis localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Décoder le token
        const decoded = jwtDecode(token);
        setUserData(decoded); // Stocker l'utilisateur décodé dans le state
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Créer un hook personnalisé pour accéder aux données utilisateur
export const useUser = () => {
  return useContext(UserContext);
};
