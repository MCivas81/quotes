import { FaQuoteLeft, FaQuoteRight, FaXmark } from "react-icons/fa6";
import { Quote } from "../../models/Quote/Quote.model";

interface QuoteListProps {
  quotes: Quote[];
  onDelete: (id: number) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes, onDelete }) => {
  return (
    <div className="p-4">
      <h2 className="mb-6 text-xl font-semibold underline underline-offset-4">Saved Quotes</h2>
      <ul className="space-y-5">
        {quotes?.map((quote) => (
          <li
            key={quote.id}
            className="relative flex items-center justify-between rounded-md border border-slate-300 bg-slate-50 p-4 shadow-md"
          >
            <FaQuoteLeft className="absolute -left-2 -top-3 h-7 w-7 text-cyan-600" />
            <FaQuoteRight className="absolute -bottom-3 -right-2 h-7 w-7 text-cyan-600" />
            <FaXmark
              className="absolute right-2 top-2 h-4 w-4 cursor-pointer"
              onClick={() => onDelete(quote.id)}
            />
            <div className="mr-4 space-y-4">
              <p className="text-gray-800">{quote.text}</p>
              {quote.author && <p className="italic text-gray-500">- {quote.author}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
