import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function NavBar() {
  const { userData, logout } = useUser();

  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        {userData ? (
          <>
            <NavLink
              to={`/createur/${userData.id_createur}`}
              className="nav-link"
            >
              Profil
            </NavLink>
            <button onClick={logout} className="button logout-btn">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="button login-btn">
              Login
            </NavLink>
            <NavLink to="/sign-up" className="button sign-up-btn">
              Sign-Up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
