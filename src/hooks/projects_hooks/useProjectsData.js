// src/hooks/useProjectsData.js

export function useProjectsData(projects, filter, page) {
  const perPage = 6;

  const filtered = projects.filter((p) => 
    filter === "All" ? true : p.tag === filter
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return { filtered, paginated, totalPages };
}