import type { ModelData } from "../../models/Model";
import type { ModelFilterOptions } from "../../filters/types";
import { FilterOptions } from "../../filters/FilterOptions";

interface FilterPanelProps {
  models: ModelData[];
  filters: ModelFilterOptions;
  onFilterChange: (
    filters: ModelFilterOptions
  ) => void;
}

export function FilterPanel({models, filters, onFilterChange}: FilterPanelProps) {
  const updateFilter = ( key: keyof ModelFilterOptions, value: string | number | undefined) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div>
      <h3>Filters</h3>

      <div>
        <label>Family</label>

        <select
          value={filters.family ?? ""}
          onChange={(event) =>
            updateFilter("family",event.target.value || undefined)
          }
        >
          <option value="">All Families</option>

          {FilterOptions.getFamilies(models).map(
            (family) => (
              <option key={family} value={family}>
                {family}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label>Pipeline</label>

        <select
          value={filters.pipeline ?? ""}
          onChange={(event) =>
            updateFilter(
              "pipeline",
              event.target.value || undefined
            )
          }
        >
          <option value="">All Pipelines</option>

          {FilterOptions.getPipelines(models).map(
            (pipeline) => (
              <option key={pipeline} value={pipeline}>
                {pipeline}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label>Architecture</label>

        <select
          value={filters.architecture ?? ""}
          onChange={(event) =>
            updateFilter(
              "architecture",
              event.target.value || undefined
            )
          }
        >
          <option value="">All Architectures</option>

          {FilterOptions.getArchitectures(models).map(
            (architecture) => (
              <option
                key={architecture}
                value={architecture}
              >
                {architecture}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label>Weight Format</label>

        <select
          value={filters.weight ?? ""}
          onChange={(event) =>
            updateFilter(
              "weight",
              event.target.value || undefined
            )
          }
        >
          <option value="">All Weight Formats</option>

          {FilterOptions.getWeights(models).map(
            (weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label>Minimum Safetensor Files</label>

        <input
          type="number"
          min="0"
          value={filters.safetensorMin ?? ""}
          onChange={(event) =>
            updateFilter(
              "safetensorMin",
              event.target.value === "" ? undefined : Number(event.target.value)
            )
          }
        />
      </div>

      <div>
        <label>Maximum Safetensor Files</label>

        <input
          type="number"
          min="0"
          value={filters.safetensorMax ?? ""}
          onChange={(event) =>
            updateFilter(
              "safetensorMax",
              event.target.value === "" ? undefined : Number(event.target.value)
            )
          }
        />
      </div>
    </div>
  );
}