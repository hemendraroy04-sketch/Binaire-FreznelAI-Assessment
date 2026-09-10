import { useEffect, useMemo, useState } from "react";
import { ModelService } from "./models/ModelService";
import type { ModelData } from "./models/Model";
import { ModelSearch } from "./search/ModelSearch";
import { debounce } from "./utils/debounce";

function App() {
  const [models, setModels] = useState<ModelData[]>([]);
  const [query, setQuery] = useState("");
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

  const search = useMemo(() => {
    return new ModelSearch(models);
  }, [models]);

  const [filteredModels, setFilteredModels] = useState<ModelData[]>([]);

  useEffect(() => {
    setFilteredModels(models);
  }, [models]);

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        const results = search.search(value);
        setFilteredModels(results);
      }, 300),
    [search]
  );

  const onSearchChange = (value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  if (loading) {
    return <h1>Loading models...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>Model Search</h1>

      <input
        type="text"
        placeholder="Search models..."
        value={query}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <p>
        Showing {filteredModels.length} of {models.length} models
      </p>

      {filteredModels.slice(0, 50).map((model) => (
        <div key={model.id}>
          <h2>{model.display_name}</h2>
          <p>Family: {model.family}</p>
          <p>Architecture: {model.architecture_category}</p>
          <p>Weight: {model.weight_format}</p>
          <p>
            Safetensors: {model.safetensor_file_count}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;