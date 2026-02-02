// src/components/projects/ProjectCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({
  project,
  getImages,
  getProjectRatio,
  loadedMap,
  handleThumbLoad,
  openModal,
  CARD_VARIANTS,
}) {
  const imgs = getImages(project);
  const thumb = imgs[0] || "";
  const ratio = getProjectRatio(project);

  return (
    <motion.article
      layout
      variants={CARD_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.34 }}
      onClick={() => openModal(project)}
      onKeyDown={(e) => e.key === "Enter" && openModal(project)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      className="group bg-white dark:bg-[#0f1f36] rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
    >
      <div className="w-full">
        {!loadedMap[project.id] && (
          <div
            className="animate-pulse bg-gray-200 dark:bg-gray-800"
            style={{ height: 240 }}
          />
        )}
        <img
          src={thumb}
          alt={project.title}
          loading="lazy"
          onLoad={() => handleThumbLoad(project.id)}
          className={`
            w-full
            h-[240px]
            object-cover
            transition-transform duration-500
            transition-opacity duration-300
            group-hover:scale-105
            ${loadedMap[project.id] ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-blue-600 dark:text-[#8EC9FF] mb-1">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300/90 line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((t, i) => (
            <span key={i} className="text-xs bg-blue-200 text-blue-800 dark:bg-[#162c4d] dark:text-[#AED4FF] px-2 py-1 rounded">{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}