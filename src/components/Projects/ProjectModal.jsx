// src/components/projects/ProjectModal.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImageSlider from "./ImageSlider";

const baseButton =
  "py-3 rounded-md font-medium \
   bg-[#194a7a] text-white dark:bg-[#AED4FF] dark:text-[#0a192f] \
   hover:brightness-110 \
   disabled:bg-gray-400 \
   disabled:text-gray-700 \
   disabled:opacity-60 \
   disabled:cursor-not-allowed \
   transition";

export default function ProjectModal({
  modalProject,
  imageIndex,
  setImageIndex,
  filteredProjects,
  closeModal,
  getImages,
  getProjectRatio,
  handlePrevProject,
  handleNextProject,
}) {
  /* =========================
     Hooks (ALWAYS first)
  ========================= */

  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  const [activeSection, setActiveSection] = useState("description");

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const images = useMemo(
    () => (modalProject ? getImages(modalProject) : []),
    [modalProject, getImages],
  );

  const currentIndex = useMemo(() => {
    if (!modalProject) return -1;
    return filteredProjects.findIndex((p) => p.id === modalProject.id);
  }, [filteredProjects, modalProject]);

  const modalRatio = modalProject ? getProjectRatio(modalProject) : 1;
  const modalIsPortrait = modalRatio < 1;
  const hasMultipleImages = images.length > 1;

  const hasLinks =
    modalProject?.links?.filter((link) => link.url && link.url !== "#").length >
    0;

  /* =========================
     ESC key handling
  ========================= */
  useEffect(() => {
    if (!modalProject) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isImageFullscreen) {
          setIsImageFullscreen(false);
        } else {
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImageFullscreen, closeModal, modalProject]);

  /* =========================
      Reset section on project change
  ========================= */

  useEffect(() => {
    if (modalProject) {
      setActiveSection("description");
    }
  }, [modalProject]);

  /* =========================
     Render guard
  ========================= */
  if (!modalProject) return null;

  /* =========================
     JSX
  ========================= */
  return (
    <AnimatePresence>
      <motion.div
        key={`modal-${modalProject.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed inset-0 z-50
          flex items-start md:items-center justify-center
          p-2 md:p-4
          bg-black/65 backdrop-blur-sm
        "
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <motion.div
          initial={{ scale: 0.98, y: -16 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.98, y: 16 }}
          transition={{ duration: 0.25 }}
          className="
            relative
            bg-white dark:bg-[#020d1a]
            rounded-xl shadow-2xl
            w-full max-w-5xl
            max-h-[92vh]
            overflow-hidden
            flex flex-col
          "
        >
          {/* Close */}
          <button
            onClick={closeModal}
            aria-label="Close"
            className="
              absolute top-4 right-4 z-30
              p-2 rounded-full
              bg-white/90 dark:bg-[#00121a]
              hover:bg-gray-200 dark:hover:bg-[#001f2e]
              transition
            "
          >
            <X size={20} />
          </button>

          <div
            className={`flex h-full overflow-hidden ${
              modalIsPortrait ? "flex-col md:flex-row" : "flex-col"
            }`}
          >
            {/* Media */}
            <div
              className={`
                relative
                bg-black/5 dark:bg-black
                flex items-center justify-center
                shrink-0 overflow-hidden
                ${
                  modalIsPortrait
                    ? "w-full md:w-[45%] max-h-[50vh] md:max-h-[85vh]"
                    : "w-full h-[40vh] md:h-[45vh]"
                }
              `}
            >
              {modalProject.type !== "video" && (
                <button
                  onClick={() => setIsImageFullscreen(true)}
                  className="
                  absolute top-3 left-3 z-20
                  p-2 py-1 rounded-full
                  bg-black/60 text-white
                  hover:bg-black/80 transition
                "
                >
                  ⛶
                </button>
              )}

              {hasMultipleImages && (
                <div
                  className="
                  absolute bottom-3 right-3 z-20
                  px-2 py-1 text-xs rounded
                  bg-black/60 text-white
                "
                >
                  {imageIndex + 1} / {images.length}
                </div>
              )}

              {images.length > 0 && (
                <ImageSlider
                  images={images}
                  video={
                    modalProject.type === "video" ? modalProject.video : null
                  }
                  imageIndex={imageIndex}
                  setImageIndex={setImageIndex}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-[#AED4FF] mb-2">
                {modalProject.title}
              </h2>

              {/* Description Section */}
              <div className="mb-3 border-b border-gray-200 dark:border-white/10">
                <button
                  onClick={() => toggleSection("description")}
                  className="w-full text-left py-2 font-semibold flex justify-between items-center"
                >
                  Project Description
                  <span
                    className={`transition-transform ${
                      activeSection === "description" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {activeSection === "description" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-700 dark:text-gray-200 pb-3">
                        {modalProject.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mb-3 border-b border-gray-200 dark:border-white/10">
                <button
                  onClick={() => toggleSection("tags")}
                  className="w-full text-left py-2 font-semibold flex justify-between items-center"
                >
                  Technologies
                  <span
                    className={`transition-transform ${
                      activeSection === "tags" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {activeSection === "tags" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 pb-3">
                        {modalProject.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-[#0f2a44]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {hasLinks && (
                <div className="mb-3">
                  <button
                    onClick={() => hasLinks && toggleSection("links")}
                    disabled={!hasLinks}
                    className={`
                    w-full text-left py-2 font-semibold
                    flex justify-between items-center
                    ${!hasLinks ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  >
                    Project Links
                    <span
                      className={`transition-transform ${
                        activeSection === "links" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {activeSection === "links" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pb-3"
                      >
                        <div className="flex flex-col gap-2">
                          {modalProject.links?.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-md text-sm text-center bg-[#194a7a] text-white dark:bg-[#AED4FF] dark:text-[#0a192f]"
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div
                className="
                  mt-auto pt-4
                  flex flex-col sm:flex-row
                  gap-3 sm:gap-0
                  justify-between
                border-t border-gray-200 dark:border-white/15
              "
              >
                <button
                  onClick={handlePrevProject}
                  disabled={currentIndex <= 0}
                  className={baseButton}
                >
                  « Previous
                </button>
                <button
                  onClick={handleNextProject}
                  disabled={currentIndex >= filteredProjects.length - 1}
                  className={baseButton}
                >
                  Next »
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen image */}
        <AnimatePresence>
          {isImageFullscreen && (
            <motion.div
              key="fullscreen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed inset-0 z-[999]
                bg-black/90
                flex items-center justify-center
                p-4
              "
              onClick={() => setIsImageFullscreen(false)}
            >
              <motion.img
                src={images?.[imageIndex]}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
