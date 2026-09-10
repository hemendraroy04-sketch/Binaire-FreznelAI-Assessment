import { useEffect, useMemo, useState } from "react";

import { ModelService } from "./models/ModelService";
import type { ModelData } from "./models/Model";

import { ModelSearch } from "./search/ModelSearch";
import { debounce } from "./utils/debounce";

import type { ModelFilterOptions } from "./filters/types";
import { ModelFilter } from "./filters/ModelFilter";

import { SearchBar } from "./components/search/SearchBar";
import { FilterPanel } from "./components/filters/FilterPanel";
import { ModelList } from "./components/models/ModelList";

function App() {
  const [models, setModels] = useState<ModelData[]>([]);
  const [filteredModels, setFilteredModels] = useState<ModelData[]>([]);
  const [query, setQuery] = useState("");

  const [filterOptions, setFilterOptions] =
    useState<ModelFilterOptions>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const service = new ModelService();

    service
      .getModels()
      .then((data) => {
        setModels(data);
        setFilteredModels(data);
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

  const applySearchAndFilters = (
    searchQuery: string,
    filters: ModelFilterOptions
  ) => {
    const searchedModels = search.search(searchQuery);

    const modelFilter = new ModelFilter(searchedModels);

    const results = modelFilter.filter(filters);

    setFilteredModels(results);
  };

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        applySearchAndFilters(value, filterOptions);
      }, 300),
    [search, filterOptions]
  );

  const handleSearchChange = (value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  const handleFilterChange = (
    newFilters: ModelFilterOptions
  ) => {
    setFilterOptions(newFilters);
    applySearchAndFilters(query, newFilters);
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

      <SearchBar
        query={query}
        onSearchChange={handleSearchChange}
      />

      <FilterPanel
        models={models}
        filters={filterOptions}
        onFilterChange={handleFilterChange}
      />

      <p>
        Showing {filteredModels.length} of {models.length} models
      </p>

      <ModelList models={filteredModels} />
    </div>
  );
}

export default App;