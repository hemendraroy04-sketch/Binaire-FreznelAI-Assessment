import type { ModelData } from "../models/Model";

export class FilterOptions {
  static getFamilies(models: ModelData[]): string[] {
    return [...new Set(models.map((model) => model.family))].sort();
  }

  static getArchitectures(models: ModelData[]): string[] {
    return [...new Set(models.map((model) => model.architecture_category))].sort();
  }

  static getWeights(models: ModelData[]): string[] {
    return [...new Set(models.map((model) => model.weight_format))].sort();
  }

  static getPipelines(models: ModelData[]): string[] {
    return [...new Set(models.map((model) => model.hf_tags.pipeline_tag))].sort();
  }
}