/**
 * Composant Input personnalisé
 * @param {string} placeholder - Texte indicatif pour l'input
 * @param {string} value - Valeur actuelle de l'input
 * @param {(s: string) => void} onChange - Fonction appelée lors d'un changement
 * @param {string} [type] - Type d'input (text, email, password, etc.)
 * @param {string} [id] - ID de l'input
 * @param {string} [label] - Texte affiché pour le label
 * @param {string} [name] - Nom de l'input
 * @param {boolean} [required] - Indique si l'input est requis
 * @param {object} [style] - Styles CSS optionnels
 * @param {number} [caractereMin] - Nombre minimum de caractères pour l'input
 * @param {number} [caractereMax] - Nombre maximum de caractères pour l'input
 */
export function Input({
  placeholder = "",
  value,
  onChange,
  style,
  id,
  label,
  type = "text",
  name,
  required = false,
  caractereMin,
  caractereMax,
}) {
  // Calcul de la longueur de l'input
  const length = value ? value.length : 0;

  // Message d'erreur basé sur les limites de caractères
  const minError =
    caractereMin && length < caractereMin
      ? `Minimum de ${caractereMin} caractères requis.`
      : "";
  const maxError =
    caractereMax && length > caractereMax
      ? `Maximum de ${caractereMax} caractères autorisés.`
      : "";

  return (
    <div className="form-input">
      {label && <label htmlFor={id}>{label}</label>}
      <div>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          style={style}
          required={required}
          className="form-control"
        />
      </div>
      {/* Affichage du nombre de caractères uniquement si caractereMin ou caractereMax est renseigné */}
      {(caractereMin || caractereMax) && (
        <p style={{ color: "gray", fontSize: "0.85em" }}>
          {length}/{caractereMax} caractères
        </p>
      )}

      {/* Affichage des messages d'erreur si nécessaire */}
      {(minError || maxError) && (
        <p style={{ color: "red", fontSize: "0.85em" }}>
          {minError || maxError}
        </p>
      )}
    </div>
  );
}
