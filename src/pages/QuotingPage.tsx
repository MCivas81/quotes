import RandomQuote from "../components/quotes/RandomQuote";
import QuoteForm from "../components/quotes/QuoteForm";
import QuoteList from "../components/quotes/QuoteList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addQuote, deleteQuote, selectQuotes } from "../redux/reducers/quotesSlice";

const QuotingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);

  const handleSaveQuote = (quote: string, author: string) => {
    dispatch(addQuote({ id: Date.now(), text: quote, author }));
  };

  const handleDeleteQuote = (id: number) => {
    dispatch(deleteQuote(id));
  };

  return (
    <div className="flex min-h-full justify-center bg-white p-4">
      <div className="w-full max-w-lg">
        <RandomQuote />
        <QuoteForm onSave={handleSaveQuote} />
        <QuoteList quotes={quotes} onDelete={handleDeleteQuote} />
      </div>
    </div>
  );
};

export default QuotingPage;
