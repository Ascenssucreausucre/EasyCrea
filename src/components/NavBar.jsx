import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState, useRef, useEffect } from "react";
import logo from "/src/assets/img/EasyCrea.svg";
import burger from "../assets/img/menu.png";

export function NavBar() {
  const { userData, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen && // Vérifie si le menu est ouvert
        navRef.current && // Vérifie si la ref est définie
        !navRef.current.contains(event.target) && // Vérifie si le clic est en dehors du menu
        !event.target.closest(".burger") // Vérifie si le clic n'est pas sur le bouton burger
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

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
      <nav ref={navRef} className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Menu
        </NavLink>
        <NavLink
          to="/decks"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
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
                Modération
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
