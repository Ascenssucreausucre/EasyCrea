import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import logo from "/src/assets/img/EasyCrea.svg";
import burger from "../assets/img/menu.png";

export function NavBar() {
  const { userData, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="Logo EasyCrea" className="logo" />
      </Link>

      {/* Bouton Burger */}
      <div className="burger" onClick={toggleMenu}>
        <img src={burger} alt="Menu Burger" />
      </div>

      {/* Menu */}
      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Decks
        </NavLink>

        {userData ? (
          <>
            {userData.userType === "administrateur" ? (
              <NavLink
                to={`/administrateur/`}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to={`/createur/${userData.id_createur}`}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Profil
              </NavLink>
            )}

            <NavLink
              to="/"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="button logout-btn"
            >
              Déconnexion
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="button login-btn"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/sign-up"
              className="button sign-up-btn"
              onClick={() => setMenuOpen(false)}
            >
              Sign-Up
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}
