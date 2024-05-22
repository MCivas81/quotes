import { useEffect } from "react";
import { Quote } from "../../types/Quote";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
  value: string;
  onSearchChange: (value: string) => void;
  disabled: boolean;
  quotes: Quote[];
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearchChange, disabled, quotes }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  useEffect(() => {
    if (quotes.length < 1 && value.length > 0) {
      onSearchChange("");
    }
  }, [quotes, value]);

  return (
    <div className="relative flex-1 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FaMagnifyingGlass className="text-gray-400" aria-hidden="true" />
      </div>
      <input
        data-testid="search-bar"
        id="search"
        type="text"
        placeholder="Search..."
        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 disabled:opacity-50 sm:text-sm sm:leading-6"
        value={value}
        onChange={handleSearchChange}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchBar;
