import type { ModelData, ModelsResponse } from "../models/Model";

export class ModelApi {
  private readonly apiUrl = "/api/hf-models-api.json";

  fetchModels(): Promise<ModelData[]> {
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        return response.json() as Promise<ModelsResponse>;
      })
      .then((data) => {return data.models});
  }
}