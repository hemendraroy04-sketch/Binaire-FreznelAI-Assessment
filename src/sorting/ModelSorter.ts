import type { ModelData } from "../models/Model";

export type SortField = "name" | "safetensors";
export type SortDirection = "asc" | "desc";

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

export class ModelSorter {
  sort( models: ModelData[], options: SortOptions ): ModelData[] {
    return [...models].sort((a, b) => {
      let comparison = 0;

      if (options.field === "name") {
        comparison = a.display_name.localeCompare(b.display_name);
      }

      if (options.field === "safetensors") {
        comparison = Number(a.safetensor_file_count) - Number(b.safetensor_file_count);
      }

      return options.direction === "asc" ? comparison : -comparison;
    });
  }
}