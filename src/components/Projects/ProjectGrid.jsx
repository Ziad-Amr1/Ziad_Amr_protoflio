// src/components/projects/ProjectGrid.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  paginatedProjects,
  getImages,
  getProjectRatio,
  loadedMap,
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
      <AnimatePresence mode="sync">
        {paginatedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            getImages={getImages}
            getProjectRatio={getProjectRatio}
            loadedMap={loadedMap}
            handleThumbLoad={handleThumbLoad}
            openModal={openModal}
            CARD_VARIANTS={CARD_VARIANTS}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}