// src/components/projects/ProjectFilters.jsx
import React from "react";

export default function ProjectFilters({ categories, activeFilter, setActiveFilter, setCurrentPage }) {
  return (
    <div className="flex justify-center gap-3 mb-8 flex-wrap">
      {categories.map((cat) => {
        const active = activeFilter === cat;
        return (
          <button
            key={cat}
            onClick={() => {
              setActiveFilter(cat);
              setCurrentPage(1);
            }}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              ${
                active
                  ? `
                    bg-blue-200 text-blue-800
                    dark:bg-[#162c4d] dark:text-[#E6F1FF]
                    shadow-sm scale-105
                  `
                  : `
                    bg-white/70 text-gray-700
                    dark:bg-[#0f1f36] dark:text-[#AED4FF]
                    hover:bg-white hover:shadow-sm
                  `
              }
            `}
            aria-pressed={active}
            aria-label={`filter by ${cat}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}