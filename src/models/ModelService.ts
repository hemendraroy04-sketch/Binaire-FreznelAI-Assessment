import { ModelApi } from "../api/ModelApi";
import type { ModelData } from "./Model";

export class ModelService {
  private readonly api: ModelApi;

  constructor() {
    this.api = new ModelApi();
  }

  getModels(): Promise<ModelData[]> {
    return this.api.fetchModels();
  }
}