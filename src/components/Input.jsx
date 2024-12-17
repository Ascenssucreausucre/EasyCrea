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
}) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
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
  );
}
