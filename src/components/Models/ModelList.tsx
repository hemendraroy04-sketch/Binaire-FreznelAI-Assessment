import type { ModelData } from "../../models/Model";

interface ModelListProps {
  models: ModelData[];
}

export function ModelList({
  models,
}: ModelListProps) {
  return (
    <div className="model-list">
      {models.slice(0, 50).map((model) => (
        <div className="model-card" key={model.id}>
          <h2>{model.display_name}</h2>

          <p>
            <strong>Family:</strong> {model.family}
          </p>

          <p>
            <strong>Pipeline:</strong>{" "}
            {model.hf_tags.pipeline_tag}
          </p>

          <p>
            <strong>Architecture:</strong>{" "}
            {model.architecture_category}
          </p>

          <p>
            <strong>Weight:</strong> {model.weight_format}
          </p>

          <p>
            <strong>Safetensors:</strong>{" "}
            {model.safetensor_file_count}
          </p>
        </div>
      ))}
    </div>
  );
}