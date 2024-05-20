import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { Quote } from "../../types/Quote";
import CopyToClipboardButton from "./CopyToClipboardButton";
import { LuTrash2 } from "react-icons/lu";

interface QuoteItemProps {
  quote: Quote;
  onDelete: (id: string) => void;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote, onDelete }) => {
  return (
    <li
      data-testid="quote-item"
      className="relative flex flex-col items-center justify-center rounded-md border border-slate-300 bg-slate-50 p-8 shadow-md"
    >
      <FaQuoteLeft className="absolute -left-3 -top-3 h-6 w-6 text-cyan-600" />
      <FaQuoteRight className="absolute -bottom-3 -right-3 h-6 w-6 text-cyan-600" />

      <div className="w-full space-y-3 pb-6">
        <p className="italic text-gray-600">{quote.text}</p>
      </div>
      <div className="flex w-full items-center justify-between border-t border-cyan-600 pt-4">
        {quote.author && <p className="mr-2 text-sm text-gray-800">- {quote.author}</p>}
        <div className="ml-auto flex items-center space-x-3">
          <CopyToClipboardButton quote={quote} />
          <LuTrash2
            data-testid="delete-button"
            className="cursor-pointer text-gray-800 hover:text-red-600"
            onClick={() => onDelete(quote.id)}
          />
        </div>
      </div>
    </li>
  );
};

export default QuoteItem;
