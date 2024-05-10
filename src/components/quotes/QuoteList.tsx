import { Quote } from "../../types/Quote";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import SearchBar from "./SearchBar";
import QuoteItem from "./QuoteItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { deleteQuote, selectQuotes } from "../../state/reducers/quotesSlice";
import { BsBlockquoteLeft } from "react-icons/bs";

const QuoteList: React.FC = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quotes);

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

  const debouncedFilterQuotes = debounce(filterQuotes, 500);

  useEffect(() => {
    filterQuotes(searchQuery);
  }, [quotes]);

  return (
    <div className="px-4 py-4">
      <div className="mb-10 flex w-full flex-col justify-between space-y-3 border-b-2 border-cyan-600 pb-3 sm:flex-row sm:items-end sm:space-x-12 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <BsBlockquoteLeft className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Your list ({quotes.length})</h2>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          disabled={quotes.length < 1}
          onFilter={debouncedFilterQuotes}
        />
      </div>
      <ul className="space-y-8">
        {filteredQuotes?.map((quote) => (
          <QuoteItem key={quote.id} quote={quote} onDelete={handleDeleteQuote} />
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
