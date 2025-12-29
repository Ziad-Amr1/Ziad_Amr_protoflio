// src/components/projects/PaginationControls.jsx
import React from "react";

export default function PaginationControls({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="
          px-4 py-2 rounded-md text-sm font-medium
          bg-white/70 text-gray-700
          dark:bg-[#0f1f36] dark:text-[#AED4FF]
          hover:bg-white hover:shadow-sm
          disabled:opacity-40 disabled:cursor-not-allowed
        "
        aria-label="previous page"
        aria-disabled={currentPage === 1}
      >
        ‹ Prev
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2 rounded-md text-sm font-medium
          bg-white/70 text-gray-700
          dark:bg-[#0f1f36] dark:text-[#AED4FF]
          hover:bg-white hover:shadow-sm
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Next ›
      </button>
    </div>
  );
}