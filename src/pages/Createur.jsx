import { useParams } from "react-router-dom";
import { NavBar } from "../components/Navbar";

export function Createur() {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <h1>{id}</h1>
    </>
  );
}
