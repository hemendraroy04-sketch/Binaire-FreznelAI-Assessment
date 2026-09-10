import { ModelApi } from "../api/ModelApi";
import { ModelCache } from "../storage/ModelCache";

export class BackgroundFetcher {
  private readonly api: ModelApi;
  private readonly cache: ModelCache;

  constructor() {
    this.api = new ModelApi();
    this.cache = new ModelCache();
  }

  fetchAndCache(): Promise<void> {
    return this.api
      .fetchModels()
      .then((models) => {
        return this.cache.saveModels(models);
      })
      .catch((error) => {
        console.error(
          "Background fetch failed:",
          error
        );
      });
  }
}