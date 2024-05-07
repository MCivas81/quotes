import { FaQuoteLeft, FaQuoteRight, FaXmark } from "react-icons/fa6";
import { Quote } from "../../models/Quote/Quote.model";
import CopyToClipboardButton from "./CopyToClipboardButton";
import Tooltip from "../tooltip/Tooltip";

interface QuoteItemProps {
  quote: Quote;
  onDelete: (id: number) => void;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote, onDelete }) => {
  return (
    <li className="relative flex items-center justify-start rounded-md border border-slate-300 bg-slate-50 px-5 py-4 shadow-md">
      <FaQuoteLeft className="absolute -left-2 -top-3 h-7 w-7 text-cyan-600" />
      <FaQuoteRight className="absolute -bottom-3 -right-2 h-7 w-7 text-cyan-600" />
      <Tooltip message="Delete quote">
        <FaXmark
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => onDelete(quote.id)}
        />
      </Tooltip>
      <div className="mr-10 space-y-3">
        <p className="text-gray-800">{quote.text}</p>
        {quote.author && <p className="italic text-gray-500">- {quote.author}</p>}
      </div>
      <Tooltip message="Copy to clipboard">
        <CopyToClipboardButton quote={quote} />
      </Tooltip>
    </li>
  );
};

export default QuoteItem;
