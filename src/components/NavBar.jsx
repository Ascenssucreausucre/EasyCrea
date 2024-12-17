import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Utilisation de jwtDecode sans erreur

export function NavBar() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Décoder le token JWT pour extraire les informations utilisateur
        const decoded = jwtDecode(token); // Utilisation de jwtDecode
        setUserData(decoded); // Stocker les données de l'utilisateur dans l'état
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
        localStorage.removeItem("token"); // Supprimer le token invalide
        navigate("/login"); // Rediriger vers la page de login
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token
    setUserData(null); // Réinitialiser l'état utilisateur
    navigate("/login"); // Rediriger vers la page de login
  };

  return (
    <header>
      <nav>
        <NavLink to={"/"}>Home</NavLink>

        {userData ? (
          <>
            <NavLink to={`/createur/${userData.id_createur}`}>Profil</NavLink>
            <button onClick={handleLogout} className="button logout-btn">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to={"/login"} className="button login-btn">
              Login
            </NavLink>
            <NavLink to={"/sign-up"} className="button sign-up-btn">
              Sign-Up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
