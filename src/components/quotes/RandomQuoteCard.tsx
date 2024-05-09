import { BsChatQuote } from "react-icons/bs";
import { RandomQuote } from "../../models/Quote/Quote.model";
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
        <BsChatQuote
          className="mb-4 h-6 w-6 cursor-pointer ml-auto"
          onClick={() => setIsCardClosed(!isCardClosed)}
        />
      )}
      {!isCardClosed && (
        <div className="relative mb-6 rounded-lg border border-slate-300 bg-white p-6 shadow-md">
          <FaXmark
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setIsCardClosed(!isCardClosed)}
          />
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
