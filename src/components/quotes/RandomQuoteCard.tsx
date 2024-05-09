import { BsChatQuote } from "react-icons/bs";
import { RandomQuote } from "../../models/Quote/Quote.model";

export interface RandomQuoteCardProps {
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
  return (
    <div className="mb-6 rounded-lg border border-slate-300 bg-white p-6 shadow-md">
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
  );
};

export default RandomQuoteCard;
