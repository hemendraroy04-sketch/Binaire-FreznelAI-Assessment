import type { ModelData } from "../models/Model";
import { ModelFilterOptions } from "./types";

export class ModelFilter {
  private models: ModelData[];

  constructor(models: ModelData[]) {
    this.models = models;
  }

  filter(options: ModelFilterOptions): ModelData[] {
    return this.models.filter((model) => {
    //originally it's in string format
      const safetensorCount = Number(model.safetensor_file_count);
      if( options.pipeline && model.hf_tags.pipeline_tag !== options.pipeline ) return false;
      if(options.family && model.family !== options.family) return false;
      if( options.architecture && model.architecture_category !== options.architecture) return false;
      if(options.weight && model.weight_format !== options.weight) return false;
      if(options.safetensorMin !== undefined && safetensorCount < options.safetensorMin) return false;
      if(options.safetensorMax !== undefined && safetensorCount > options.safetensorMax) return false;

      return true;
    });
  }
}