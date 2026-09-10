import { ModelApi } from "../api/ModelApi";
import type { ModelData } from "./Model";
import { ModelCache } from "../storage/ModelCache";

export class ModelService {
  private readonly api: ModelApi;
  private readonly cache: ModelCache;

  constructor() {
    this.api = new ModelApi();
    this.cache = new ModelCache();
  }

  getModels(): Promise<ModelData[]> {
    return this.api
      .fetchModels()
      .then((models) => {
        return this.cache
          .saveModels(models)
          .then(() => models);
      })
      .catch(() => {
        return this.cache.getModels().then((cachedModels) => {
          if (!cachedModels) {
            throw new Error(
              "Unable to load models. No cached data available."
            );
          }

          return cachedModels;
        });
      });
  }
}