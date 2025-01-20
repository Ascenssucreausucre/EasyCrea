import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Décoder le token si présent dans le localStorage au démarrage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Fonction pour gérer la connexion
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    localStorage.setItem("user-data", JSON.stringify(decoded));
    console.log(localStorage.getItem("user-data"));
    setUserData(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
