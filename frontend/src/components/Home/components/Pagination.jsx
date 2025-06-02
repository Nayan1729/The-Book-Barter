import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages - 1, start + 4);

    if (totalPages > 5 && end - start < 4) {
      start = Math.max(0, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-6">
      {/* First Page */}
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className={`p-2 rounded-md border transition ${
          currentPage === 0 ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        <ChevronsLeft size={18} />
      </button>

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`p-2 rounded-md border transition ${
          currentPage === 0 ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers (Hidden on Small Screens) */}
      <div className="hidden sm:flex space-x-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-md border transition ${
              currentPage === page ? "bg-amber-700 text-white" : "hover:bg-gray-200"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`p-2 rounded-md border transition ${
          currentPage === totalPages - 1 ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        <ChevronRight size={18} />
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className={`p-2 rounded-md border transition ${
          currentPage === totalPages - 1 ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
