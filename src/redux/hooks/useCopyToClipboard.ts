import { useCallback, useEffect, useState } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      console.log("Copied to clipboard:", text);
    } catch (error) {
      setIsCopied(false);
      console.error("Unable to copy to clipboard:", error);
    }
  }, []);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;
