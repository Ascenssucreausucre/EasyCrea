export function InputRange({ id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>Filtrer par prix</label>
      <input
        type="range"
        className="form-control"
        min="0"
        max="10"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p>En dessous de {value} likes</p>
    </div>
  );
}
