import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { addQuote, selectQuotes } from "../../state/reducers/quotesSlice";
import { RandomQuote } from "../../types/Quote";
import RandomQuoteFlyout from "./RandomQuoteFlyout";
import RandomQuoteCard from "./RandomQuoteCard";
import useMediaQuery from "../../hooks/useMediaQuery";

const RandomQuoteComponent: React.FC = () => {
  const [randomQuote, setRandomdQuote] = useState<RandomQuote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(selectQuotes);
  const isMobile = useMediaQuery("(max-width: 639px)");

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

  return isMobile ? (
    <RandomQuoteFlyout
      isLoading={isLoading}
      error={error}
      randomQuote={randomQuote}
      handleSaveQuote={handleSaveQuote}
      idExists={idExists}
      fetchQuote={fetchQuote}
    />
  ) : (
    <RandomQuoteCard
      isLoading={isLoading}
      error={error}
      randomQuote={randomQuote}
      handleSaveQuote={handleSaveQuote}
      idExists={idExists}
      fetchQuote={fetchQuote}
    />
  );
};

export default RandomQuoteComponent;
