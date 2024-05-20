import { FaClipboardCheck, FaRegClipboard } from "react-icons/fa6";
import { Quote } from "../../types/Quote";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

interface CopyToClipboardButtonProps {
  quote: Quote;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ quote }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <button
      onClick={() => {
        let textToCopy = quote.text;
        if (quote.author) {
          textToCopy += `\n(Author ${quote.author})`;
        }
        copyToClipboard(textToCopy);
      }}
    >
      {isCopied ? (
        <div className="flex items-center text-cyan-600">
          <FaClipboardCheck /> <span className="ml-1 text-xs">Copied!</span>
        </div>
      ) : (
        <FaRegClipboard className="text-cyan-600 hover:text-cyan-700" />
      )}
    </button>
  );
};

export default CopyToClipboardButton;
