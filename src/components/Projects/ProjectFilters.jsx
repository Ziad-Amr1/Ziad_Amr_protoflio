// src/components/projects/ProjectFilters.jsx
import React from "react";

const baseTab =
  "relative px-6 py-3 rounded-full font-semibold text-base \
   transition-[background-color,color,box-shadow,transform] duration-300 ease-out \
   cursor-pointer focus:outline-none text-sm sm:text-base";

const inactiveTab =
  "bg-white/70 text-gray-700 \
   dark:bg-[#0f1f36] dark:text-[#AED4FF] \
   hover:bg-white/90 hover:text-gray-900 \
   dark:hover:bg-[#162c4d] dark:hover:text-[#E6F1FF] \
   hover:shadow-md hover:-translate-y-[1px]";

// const activeTabStyle = `
//   bg-gradient-to-r ${accent}
//   text-white
//   shadow-lg
//   scale-[1.05]
// `;

export default function ProjectFilters({
  categories,
  activeFilter,
  setActiveFilter,
  setCurrentPage,
  accentMap,
}) {
  return (
    <div className="flex justify-center gap-3 mb-8 flex-wrap">
      {categories.map((cat) => {
        const isActive = activeFilter === cat;
        const accent = accentMap?.[cat] || "from-[#4F7FD9] to-[#9ECFFF]";
        
        return (
          <button
            key={cat}
            onClick={() => {
              setActiveFilter(cat);
              setCurrentPage(1);
            }}
            className={`
              ${baseTab}
              ${isActive ? `bg-gradient-to-r ${accent} text-white shadow-lg scale-[1.05]` : inactiveTab}
            `}
            aria-pressed={isActive}
            aria-label={`filter by ${cat}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
