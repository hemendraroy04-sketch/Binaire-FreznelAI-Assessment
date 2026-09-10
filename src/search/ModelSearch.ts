import type { ModelData } from "../models/Model";

export class ModelSearch {
  private models: ModelData[];

  constructor(models: ModelData[]) {
    this.models = models;
  }

  search(query: string): ModelData[] {
    // so that we can search both upper and lowercase
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return this.models;

    return this.models.filter((model) => {
      const name = model.display_name.toLowerCase();
      const family = model.family.toLowerCase();

      return (name.includes(normalizedQuery) || family.includes(normalizedQuery));
    });
  }
}