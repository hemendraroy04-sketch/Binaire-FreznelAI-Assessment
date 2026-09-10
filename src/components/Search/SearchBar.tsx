interface SearchBarProps {
  query: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({
  query,
  onSearchChange,
}: SearchBarProps) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search by model name or family..."
      value={query}
      onChange={(event) =>
        onSearchChange(event.target.value)
      }
    />
  );
}