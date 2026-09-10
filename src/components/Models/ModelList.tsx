import type { ModelData } from "../../models/Model";

interface ModelListProps {
  models: ModelData[];
}

export function ModelList({
  models,
}: ModelListProps) {
  return (
    <div>
      {models.slice(0, 50).map((model) => (
        <div key={model.id}>
          <h2>{model.display_name}</h2>

          <p>Family: {model.family}</p>

          <p>
            Pipeline: {model.hf_tags.pipeline_tag}
          </p>

          <p>
            Architecture: {model.architecture_category}
          </p>

          <p>
            Weight: {model.weight_format}
          </p>

          <p>
            Safetensors: {model.safetensor_file_count}
          </p>
        </div>
      ))}
    </div>
  );
}