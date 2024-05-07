interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  onFilter: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, disabled, onFilter }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <input
      id="search"
      type="text"
      placeholder="Search by keyword..."
      className="h-9 flex-1 cursor-default rounded-md border-0 bg-white px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:opacity-50 sm:text-sm sm:leading-6"
      value={value}
      onChange={handleSearchChange}
      disabled={disabled}
    />
  );
};

export default SearchBar;