interface Quote {
  text: string;
  author: string;
}

const QuoteList: React.FC<{ quotes: Quote[] }> = ({ quotes }) => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Saved Quotes</h2>
      <ul className="space-y-2">
        {quotes?.map((quote, index) => (
          <li key={index} className="space-y-2 rounded border border-gray-300 bg-white p-4">
            <p className="text-gray-800">{quote.text}</p>
            {quote.author && <p className="italic text-gray-600">- {quote.author}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
