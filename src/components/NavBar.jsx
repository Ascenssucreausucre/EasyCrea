import { NavLink } from "react-router-dom";

export function NavBar() {
  const user = 1;
  return (
    <header>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={`/createur/${user}`}>Profil</NavLink>
        <NavLink to={"/login"} className="button login-btn">
          Login
        </NavLink>
        <NavLink to={"/sign-up"} className="button sign-up-btn">
          Sign-Up
        </NavLink>
      </nav>
    </header>
  );
}
