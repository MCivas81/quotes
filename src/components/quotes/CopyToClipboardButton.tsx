import { FaClipboardCheck, FaRegClipboard } from "react-icons/fa6";
import { Quote } from "../../models/Quote/Quote.model";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

interface CopyToClipboardButtonProps {
  quote: Quote;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ quote }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <button
      className="absolute right-8 top-2 text-cyan-600"
      onClick={() => {
        let textToCopy = quote.text;
        if (quote.author) {
          textToCopy += `\n(Author ${quote.author})`;
        }
        copyToClipboard(textToCopy);
      }}
    >
      {isCopied ? <FaClipboardCheck /> : <FaRegClipboard />}
    </button>
  );
};

export default CopyToClipboardButton;
