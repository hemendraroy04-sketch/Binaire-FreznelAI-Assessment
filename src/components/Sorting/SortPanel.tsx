import type {
  SortField,
  SortDirection,
} from "../../sorting/ModelSorter";

interface SortPanelProps {
  field: SortField;
  direction: SortDirection;
  onSortChange: (
    field: SortField,
    direction: SortDirection
  ) => void;
}

export function SortPanel({ field, direction, onSortChange}: SortPanelProps) {
  return (
    <div>
      <label>Sort by: </label>

      <select
        value={field}
        onChange={(event) =>
          onSortChange(
            event.target.value as SortField,
            direction
          )
        }
      >
        <option value="name">Model Name</option>
        <option value="safetensors">
          Safetensor File Count
        </option>
      </select>

      <select
        value={direction}
        onChange={(event) =>
          onSortChange(
            field,
            event.target.value as SortDirection
          )
        }
      >
        <option value="asc">
          A → Z / Lowest → Highest
        </option>

        <option value="desc">
          Z → A / Highest → Lowest
        </option>
      </select>
    </div>
  );
}