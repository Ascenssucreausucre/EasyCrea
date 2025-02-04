import { Input } from "./Input";
import { Search } from "lucide-react"; // Import de l'icône de loupe

export function Searchbar({
  showParticipated,
  onShowParticipatedChange,
  searchItem,
  onSearchItemChange,
  range,
  onRangeChange,
}) {
  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <Search className="search-icon" size={20} /> {/* Icône de loupe */}
        <Input
          value={searchItem}
          onChange={onSearchItemChange}
          placeholder="Rechercher..."
          className="search-input"
        />
      </div>
      {/* <InputRange value={range} id="rangedItems" onChange={onRangeChange} /> */}
      {/* <Checkbox
        id="stocked"
        checked={showParticipated}
        onChange={onShowParticipatedChange}
        label="Afficher les decks auxquels j'ai déjà contribué"
      /> */}
    </div>
  );
}
