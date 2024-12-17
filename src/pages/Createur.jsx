import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { useUser } from "../context/UserContext";

export function Createur() {
  const userData = useUser();
  console.log(userData);

  return (
    <>
      <NavBar />
      <h1>Profil de {userData.userData.nom_createur}</h1>
    </>
  );
}
