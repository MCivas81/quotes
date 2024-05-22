import { Quote } from "../../types/Quote";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import useDebounce from "../../hooks/useDebounce";
import QuoteItem from "./QuoteItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { deleteQuote, selectQuotes } from "../../state/reducers/quotesSlice";
import { BsBlockquoteLeft } from "react-icons/bs";
import Pagination from "./Pagination";

const QuoteList: React.FC = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
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
  };

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  useEffect(() => {
    filterQuotes(debouncedSearchTerm);
  }, [quotes, debouncedSearchTerm]);

  //Pagination
  const ITEMS_PER_PAGE = 5;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentQuotes = filteredQuotes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const paginationNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE); i++) {
    paginationNumbers.push(i);
  }

  useEffect(() => {
    const totalPages = Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredQuotes, currentPage]);

  return (
    <div data-testid="quote-list" className="p-4">
      <div className="mb-10 flex w-full flex-col justify-between space-y-3 border-b-2 border-cyan-600 pb-3 sm:flex-row sm:items-end sm:space-x-12 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <BsBlockquoteLeft className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Your list ({quotes.length})</h2>
        </div>
        <SearchBar
          value={searchQuery}
          onSearchChange={setSearchQuery}
          disabled={quotes.length < 1}
          quotes={quotes}
        />
      </div>
      {filteredQuotes.length > 0
        ? debouncedSearchTerm.length > 0 && (
            <span className="mb-4 block text-end">
              {filteredQuotes.length} {filteredQuotes.length > 1 ? "matches found" : "match found"}
            </span>
          )
        : debouncedSearchTerm.length > 0 &&
          quotes.length > 0 && <span className="block text-center">No match found</span>}
      <ul className="space-y-8">
        {filteredQuotes.length > 0
          ? currentQuotes.map((quote) => (
              <QuoteItem key={quote.id} quote={quote} onDelete={handleDeleteQuote} />
            ))
          : debouncedSearchTerm.length < 1 &&
            quotes.length < 1 && <span className="block text-center">No quotes to display</span>}
      </ul>
      {currentQuotes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          paginationNumbers={paginationNumbers}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default QuoteList;
