// src/components/projects/Projects.jsx
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import projectsJson from "../../data/projectsData.json";
import ProjectFilters from "./ProjectFilters";
import ProjectGrid from "./ProjectGrid";
import PaginationControls from "./PaginationControls";
import ProjectModal from "./ProjectModal";
import useProjectModal from "../../hooks/projects_hooks/useProjectModal";

// Constants remain here
const GRID_ANIMATION_CONFIG = {
  staggerChildren: 0.06,
  cardDuration: 0.32,
  exitDuration: 0.22,
  ease: "easeOut",
};

const ASPECT_RATIOS = {
  portrait: 0.7,
  landscape: 1.6,
  default: 1.6,
};

const GRID_VARIANTS = {
  visible: { transition: { staggerChildren: 0.06 } },
  hidden: {},
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: GRID_ANIMATION_CONFIG.cardDuration,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: { duration: GRID_ANIMATION_CONFIG.exitDuration },
  },
};

export default function Projects() {
  const categories = ["all", "architecture", "design", "development"];

  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [ratios, setRatios] = useState({});
  const [loadedMap, setLoadedMap] = useState({});

  useEffect(() => {
    function updateItemsPerPage() {
      const width = window.innerWidth;

      let newValue = 6;

      if (width < 640) newValue = 3;
      else if (width < 1024) newValue = 4;

      setItemsPerPage((prev) => (prev === newValue ? prev : newValue));
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, activeFilter]);

  const projectsData = projectsJson.projects || [];

  const filteredProjects = useMemo(() => {
    return activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter, projectsData]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / itemsPerPage),
  );
  const paginatedProjects = useMemo(
    () =>
      filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [filteredProjects, currentPage, itemsPerPage],
  );

  const getImages = useCallback((project) => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length)
      return project.images;
    if (project.image) return [project.image];
    return [];
  }, []);

  const getProjectRatio = useCallback(
    (project) => {
      if (project?.aspect_ratio === "portrait") return ASPECT_RATIOS.portrait;
      if (project?.aspect_ratio === "landscape") return ASPECT_RATIOS.landscape;
      if (ratios[project?.id]) return ratios[project.id];
      return ASPECT_RATIOS.default;
    },
    [ratios],
  );

  const {
    modalProject,
    imageIndex,
    setImageIndex,
    openModal,
    closeModal,
    handlePrevProject,
    handleNextProject,
  } = useProjectModal(projectsData, filteredProjects, getImages);

  // useEffect(() => {
  //   let cancelled = false;

  //   paginatedProjects.forEach((project) => {
  //     if (project.aspect_ratio) return;
  //     if (ratios[project.id]) return;
  //     const imgs = getImages(project);
  //     if (!imgs.length) return;
  //     const img = new Image();
  //     img.src = imgs[0];
  //     img.onload = () => {
  //       if (cancelled) return;
  //       setRatios((prev) => ({
  //         ...prev,
  //         [project.id]: img.width / img.height,
  //       }));
  //     };
  //     img.onerror = () => {
  //       if (cancelled) return;
  //       setRatios((prev) => ({
  //         ...prev,
  //         [project.id]: ASPECT_RATIOS.default,
  //       }));
  //     };
  //   });

  //   return () => {
  //     cancelled = true;
  //   };
  // // }, [paginatedProjects, getImages, ratios]);
  //   }, [paginatedProjects, getImages]);

  useEffect(() => {
    let cancelled = false;

    paginatedProjects.forEach((project) => {
      if (project.aspect_ratio || ratios[project.id]) return;

      const imgs = getImages(project);
      if (!imgs.length) return;

      const img = new Image();
      img.src = imgs[0];

      img.onload = () => {
        if (!cancelled) {
          setRatios((prev) =>
            prev[project.id]
              ? prev
              : { ...prev, [project.id]: img.width / img.height },
          );
        }
      };
    });

    return () => {
      cancelled = true;
    };
  }, [paginatedProjects, getImages, ratios]);

  const handleThumbLoad = (projectId) => {
    setLoadedMap((prev) => ({ ...prev, [projectId]: true }));
  };

  const accentMap = {
    all: "from-gray-400 to-gray-500",
    architecture: "from-[#6EE7B7] to-[#3B82F6]",
    design: "from-[#A78BFA] to-[#F472B6]",
    development: "from-[#4F7FD9] to-[#9ECFFF]",
  };

  // const currentAccent = categoryAccents[activeFilter] || categoryAccents.all;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14"
        >
          <h2
            className="
              text-4xl md:text-5xl font-bold leading-tight
              md:leading-[1.15] pb-1
              bg-gradient-to-r from-[#4F7FD9] to-[#9ECFFF]
              bg-clip-text text-transparent
            "
          >
            Featured Projects
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Selected works across architecture, design, and development.
          </p>
        </motion.div>

        <ProjectFilters
          categories={categories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setCurrentPage={setCurrentPage}
          accentMap={accentMap}
        />

        <ProjectGrid
          paginatedProjects={paginatedProjects}
          getImages={getImages}
          getProjectRatio={getProjectRatio}
          loadedMap={loadedMap}
          handleThumbLoad={handleThumbLoad}
          openModal={openModal}
          CARD_VARIANTS={CARD_VARIANTS}
          GRID_VARIANTS={GRID_VARIANTS}
        />

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}

        <ProjectModal
          modalProject={modalProject}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          filteredProjects={filteredProjects}
          closeModal={closeModal}
          getImages={getImages}
          getProjectRatio={getProjectRatio}
          handlePrevProject={handlePrevProject}
          handleNextProject={handleNextProject}
        />
      </div>
    </section>
  );
}
