import { BsChatQuote } from "react-icons/bs";
import { RandomQuote } from "../../types/Quote";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface RandomQuoteCardProps {
  isLoading: boolean;
  error: boolean;
  randomQuote: RandomQuote | null;
  handleSaveQuote: (id: string, quote: string, author: string) => void;
  idExists: boolean;
  fetchQuote: () => void;
}

const RandomQuoteCard: React.FC<RandomQuoteCardProps> = ({
  isLoading,
  error,
  randomQuote,
  handleSaveQuote,
  idExists,
  fetchQuote,
}) => {
  const [isCardClosed, setIsCardClosed] = useState(false);

  return (
    <>
      {isCardClosed && (
        <button
          className="btn-secondary mb-4 ml-auto flex items-center justify-end space-x-2 !rounded-full !px-2 !py-2"
          onClick={() => setIsCardClosed(!isCardClosed)}
        >
          <BsChatQuote className="h-5 w-5" />
        </button>
      )}
      {!isCardClosed && (
        <div
          data-testid="random-quote-card"
          className="relative mb-6 rounded-lg border border-slate-300 bg-white px-8 py-6 shadow-md"
        >
          <FaXmark
            className="absolute right-2.5 top-2.5 cursor-pointer"
            onClick={() => setIsCardClosed(!isCardClosed)}
          />
          <div className="mb-6 flex w-full items-center space-x-2 border-b-2 border-cyan-600 pb-2">
            <BsChatQuote className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Quote of the Day</h2>
          </div>
          {isLoading ? (
            <p className="mb-8">Loading quote...</p>
          ) : error ? (
            <div className="mb-8">Ooops...Something went wrong!</div>
          ) : (
            randomQuote && (
              <div className="mb-8 space-y-4">
                <p className="text-lg italic text-gray-800">{randomQuote.content}</p>
                {randomQuote.author && (
                  <p className="text-md text-gray-600">- {randomQuote.author}</p>
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
                {idExists ? "Already saved" : "Save"}
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
      )}
    </>
  );
};

export default RandomQuoteCard;
