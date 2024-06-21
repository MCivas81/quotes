import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  paginationNumbers: number[];
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  paginationNumbers,
  onPageChange,
}) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="btn-outline mt-2 h-10 w-auto"
      >
        <FaChevronLeft className="h-3 w-3" />
      </button>
      {paginationNumbers.map((pageNumber: number) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`btn-outline mt-2 h-10 w-10 ${
            currentPage === pageNumber ? "!border-cyan-600 !bg-cyan-600 !text-white" : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, paginationNumbers.length))}
        disabled={currentPage === paginationNumbers.length}
        className="btn-outline mt-2 h-10 w-auto"
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
};

export default Pagination;
