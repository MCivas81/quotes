import { FaQuoteLeft, FaQuoteRight, FaXmark } from "react-icons/fa6";
import { Quote } from "../../models/Quote/Quote.model";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

interface QuoteListProps {
  quotes: Quote[];
  onDelete: (id: number) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quotes);
  console.log("searchQuery", searchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedFilterQuotes(event.target.value);
  };

  const filterQuotes = (query: string) => {
    const filteredQuotes = quotes.filter((quote) => {
      if (!query.trim()) return true;
      const searchWords = query
        .toLowerCase()
        .split(" ")
        .filter((word) => word.trim() !== "");
      return searchWords.some(
        (word) =>
          quote.text.toLowerCase().includes(word) || quote.author.toLowerCase().includes(word)
      );
    });
    setFilteredQuotes(filteredQuotes);
  };

  console.log("filteredQuotes", filteredQuotes);
  console.log("quotes", quotes);

  const debouncedFilterQuotes = debounce(filterQuotes, 500);

  useEffect(() => {
    filterQuotes(searchQuery);
  }, [quotes]);

  return (
    quotes.length > 0 && (
      <div className="px-4 pt-4">
        <div className="mb-8 flex w-full flex-col justify-between space-y-3 border-b-2 border-cyan-600 pb-3 sm:flex-row sm:items-end sm:space-x-16 sm:space-y-0">
          <h2 className="text-xl font-semibold">Saved Quotes ({quotes.length}) </h2>
          <input
            id="search"
            type="text"
            placeholder="Search by keyword..."
            className="h-9 flex-1 cursor-default rounded-md border-0 bg-white px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:opacity-50 sm:text-sm sm:leading-6"
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={quotes.length < 1}
          />
        </div>
        <ul className="space-y-5">
          {filteredQuotes?.map((quote) => (
            <li
              key={quote.id}
              className="relative flex items-center justify-between rounded-md border border-slate-300 bg-slate-50 p-5 shadow-md"
            >
              <FaQuoteLeft className="absolute -left-2 -top-3 h-7 w-7 text-cyan-600" />
              <FaQuoteRight className="absolute -bottom-3 -right-2 h-7 w-7 text-cyan-600" />
              <FaXmark
                className="absolute right-2 top-2 h-4 w-4 cursor-pointer"
                onClick={() => onDelete(quote.id)}
              />
              <div className="mr-4 space-y-3">
                <p className="text-gray-800">{quote.text}</p>
                {quote.author && <p className="italic text-gray-500">- {quote.author}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default QuoteList;
