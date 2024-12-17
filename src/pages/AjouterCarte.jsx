import { useParams } from "react-router-dom";

export function AjouterCarte() {
  const { id } = useParams();
  return (
    <>
      <div>{id}</div>
    </>
  );
}
