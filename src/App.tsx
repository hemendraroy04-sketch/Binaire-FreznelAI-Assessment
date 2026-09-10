import { useEffect, useState } from "react";
import { ModelService } from "./models/ModelService";
import type { ModelData } from "./models/Model";

function App() {
  const [models, setModels] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const service = new ModelService();

    service
      .getModels()
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading models...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>Models: {models.length}</h1>

      {models.slice(0, 10).map((model) => (
        <div key={model.id}>
          <h2>{model.display_name}</h2>
          <p>Family: {model.family}</p>
          <p>Architecture: {model.architecture_category}</p>
          <p>
            Safetensors: {model.safetensor_file_count}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;