export interface HFModelTags {
  pipeline_tag: string;
  framework: string[];
  license: string[];
  quantization: string[];
  architecture: string[];
  task_domain: string[];
  modality: string[];
  application: string[];
  adapter_finetune: string[];
  safety_policy: string[];
  inference_serving: string[];
  all_tags: string[];
}

export interface ModelData {
  id: string;
  display_name: string;
  huggingface_repo: string;
  repo_url: string;
  family: string;
  author_namespace: string;
  architecture_category: string;
  use_case: string;
  pytorch_architecture: string;
  weight_format: string;
  safetensor_file_count: string;
  cli_download_command: string;
  hf_tags: HFModelTags;
  hf_query_examples: string[];
}

export interface ModelsResponse {
  models: ModelData[];
}