import { Quote } from "../../types/Quote";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import useDebounce from "../../hooks/useDebounce";
import QuoteItem from "./QuoteItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { deleteQuote, selectQuotes } from "../../state/reducers/quotesSlice";
import { BsBlockquoteLeft } from "react-icons/bs";

const ITEMS_PER_PAGE = 5;

const QuoteList: React.FC = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quotes);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteQuote = (id: string) => {
    dispatch(deleteQuote(id));
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
    setCurrentPage(1);
  };

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  useEffect(() => {
    filterQuotes(debouncedSearchTerm);
  }, [quotes, debouncedSearchTerm]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentQuotes = filteredQuotes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages: number[] = [];
  for (let i = 1; i <= Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE); i++) {
    totalPages.push(i);
  }

  return (
    <div data-testid="quote-list" className="px-6 py-4 sm:px-4">
      <div className="mb-10 flex w-full flex-col justify-between space-y-3 border-b-2 border-cyan-600 pb-3 sm:flex-row sm:items-end sm:space-x-12 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <BsBlockquoteLeft className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Your list ({quotes.length})</h2>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} disabled={quotes.length < 1} />
      </div>
      <ul className="space-y-8">
        {currentQuotes.length > 0 ? (
          currentQuotes.map((quote) => (
            <QuoteItem key={quote.id} quote={quote} onDelete={handleDeleteQuote} />
          ))
        ) : debouncedSearchTerm.length < 1 ? (
          <span className="block text-center">No quotes to display</span>
        ) : (
          <span className="block text-center">No match found</span>
        )}
      </ul>
      {currentQuotes.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn-outline mt-2"
          >
            Previous
          </button>
          {totalPages.map((pageNumber: number) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`btn-outline mt-2 w-10 ${
                currentPage === pageNumber ? "!border-cyan-600 !bg-cyan-600 !text-white" : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages.length))}
            disabled={currentPage === totalPages.length}
            className="btn-outline mt-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteList;
