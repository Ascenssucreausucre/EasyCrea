import { Input } from "./Input";
import { InputRange } from "./InputRange";
import { Checkbox } from "./Checkbox";

export function SearchBar({
  showStockedOnly,
  onStockedOnlyChange,
  searchItem,
  onSearchItemChange,
  range,
  onRangeChange,
}) {
  return (
    <div>
      <div className="mb-3">
        <Input
          value={searchItem}
          onChange={onSearchItemChange}
          placeholder="Rechercher..."
        />
        <InputRange value={range} id="rangedItems" onChange={onRangeChange} />
        <Checkbox
          id="stocked"
          checked={showStockedOnly}
          onChange={onStockedOnlyChange}
          label="Afficher les decks auxquels j'ai déjà contribué"
        />
      </div>
    </div>
  );
}
