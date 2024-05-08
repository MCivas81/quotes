import { useState, useEffect } from "react";
import axios from "axios";

const RandomQuote: React.FC = () => {
  interface Quote {
    content: string;
    author?: string;
  }

  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get<Quote>("https://api.quotable.io/random");
      setQuote(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="mb-6 hidden rounded-lg bg-slate-100 p-6 shadow-md sm:block">
      {isLoading ? (
        <p className="mb-4">Loading quote...</p>
      ) : error ? (
        <div className="mb-4">Ooops...Something went wrong!</div>
      ) : (
        quote && (
          <div className="mb-4 space-y-3">
            <p className="text-lg text-gray-800">{quote.content}</p>
            {quote.author && <p className="text-sm italic text-gray-600">- {quote.author}</p>}
          </div>
        )
      )}

      <div className="flex justify-end">
        <button className="btn-primary" onClick={fetchQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
};

export default RandomQuote;
