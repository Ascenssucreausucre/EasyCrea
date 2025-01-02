import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function NavBar() {
  const { userData, logout } = useUser();

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src="/src/assets/img/EasyCrea.svg" alt="" />
      </Link>

      <nav>
        <NavLink to="/" className="nav-link">
          Decks
        </NavLink>

        {userData ? (
          <>
            {userData.userType === "administrateur" ? (
              <NavLink to={`/administrateur/`} className="nav-link">
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to={`/createur/${userData.id_createur}`}
                className="nav-link"
              >
                Profil
              </NavLink>
            )}

            <NavLink to="/" onClick={logout} className="button logout-btn">
              Déconnexion
            </NavLink>
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
    </div>
  );
}
