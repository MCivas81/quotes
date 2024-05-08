import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addQuote, selectQuotes } from "../../redux/reducers/quotesSlice";
import { RandomQuote } from "../../models/Quote/Quote.model";
import { BsChatQuote } from "react-icons/bs";

const RandomQuoteCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);

  const [randomQuote, setRandomdQuote] = useState<RandomQuote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSaveQuote = (id: string, quote: string, author: string) => {
    dispatch(addQuote({ id: id, text: quote, author }));
  };

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get<RandomQuote>("https://api.quotable.io/random");
      setRandomdQuote(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const idExists = quotes.some((quote) => quote.id === randomQuote?._id);

  return (
    <div className="mb-6 hidden rounded-lg border border-slate-300 bg-white p-6 shadow-md sm:block">
      <div className="mb-6 flex w-full items-center space-x-2 border-b-2 border-cyan-600 pb-2">
        <BsChatQuote className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Quote of the day</h2>
      </div>
      {isLoading ? (
        <p className="mb-8">Loading quote...</p>
      ) : error ? (
        <div className="mb-8">Ooops...Something went wrong!</div>
      ) : (
        randomQuote && (
          <div className="mb-8 space-y-3">
            <p className="text-lg text-gray-800">{randomQuote.content}</p>
            {randomQuote.author && (
              <p className="text-md italic text-gray-600">- {randomQuote.author}</p>
            )}
          </div>
        )
      )}

      <div className="flex justify-end">
        {randomQuote && (
          <button
            className="btn-secondary w-full !rounded-r-none"
            onClick={() =>
              handleSaveQuote(randomQuote._id, randomQuote.content, randomQuote.author || "")
            }
            disabled={idExists}
          >
            {idExists ? "Already in the list" : "Add to list"}
          </button>
        )}
        <button
          className={`btn-primary ${randomQuote ? "w-full !rounded-l-none" : ""}`}
          onClick={fetchQuote}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default RandomQuoteCard;
