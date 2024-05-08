import RandomQuoteCard from "../components/quotes/RandomQuoteCard";
import QuoteForm from "../components/quotes/QuoteForm";
import QuoteList from "../components/quotes/QuoteList";

const QuotingPage: React.FC = () => {
  return (
    <div className="flex min-h-full justify-center bg-white p-4">
      <div className="w-full max-w-lg">
        <RandomQuoteCard />
        <QuoteForm />
        <QuoteList />
      </div>
    </div>
  );
};

export default QuotingPage;
