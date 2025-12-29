// src/components/projects/ProjectGrid.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  paginatedProjects,
  getImages,
  getProjectRatio,
  loadingMap,
  handleThumbLoad,
  openModal,
  CARD_VARIANTS,
  GRID_VARIANTS,
}) {
  return (
    <motion.div
      layout
      variants={GRID_VARIANTS}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      <AnimatePresence mode="wait">
        {paginatedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            getImages={getImages}
            getProjectRatio={getProjectRatio}
            loadingMap={loadingMap}
            handleThumbLoad={handleThumbLoad}
            openModal={openModal}
            CARD_VARIANTS={CARD_VARIANTS}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}