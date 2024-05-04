import QuoteForm from "../components/quotes/QuoteForm";
import QuoteList from "../components/quotes/QuoteList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addQuote } from "../redux/reducers/quotesSlice";
import { RootState } from "../redux/store";

const QuotingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector((state: RootState) => state.quotes.quotes);

  const handleSaveQuote = (quote: string, author: string) => {
    dispatch(addQuote({ text: quote, author }));
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-200">
      <div className="w-full max-w-md">
        <QuoteForm onSave={handleSaveQuote} />
        <QuoteList quotes={quotes} />
      </div>
    </div>
  );
};

export default QuotingPage;
