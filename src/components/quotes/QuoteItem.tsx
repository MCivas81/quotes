import { FaQuoteLeft, FaQuoteRight, FaXmark } from "react-icons/fa6";
import { Quote } from "../../types/Quote";
import CopyToClipboardButton from "./CopyToClipboardButton";

interface QuoteItemProps {
  quote: Quote;
  onDelete: (id: string) => void;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote, onDelete }) => {
  return (
    <li className="relative flex items-center justify-start rounded-md border border-slate-300 bg-slate-50 px-5 py-6 shadow-md">
      <FaQuoteLeft className="absolute -left-3 -top-3 h-6 w-6 text-cyan-600" />
      <FaQuoteRight className="absolute -bottom-3 -right-3 h-6 w-6 text-cyan-600" />
      <FaXmark
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => onDelete(quote.id)}
      />
      <div className="mr-10 space-y-3">
        <p className="text-gray-800">{quote.text}</p>
        {quote.author && <p className="text-sm italic text-gray-600">- {quote.author}</p>}
      </div>
      <CopyToClipboardButton quote={quote} />
    </li>
  );
};

export default QuoteItem;
