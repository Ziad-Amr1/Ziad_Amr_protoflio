// src/components/projects/ProjectModal.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImageSlider from "./ImageSlider";

const baseButton =
  "px-4 py-2 rounded-md font-medium \
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

  const images = useMemo(
    () => (modalProject ? getImages(modalProject) : []),
    [modalProject, getImages]
  );

  const currentIndex = useMemo(() => {
    if (!modalProject) return -1;
    return filteredProjects.findIndex(
      (p) => p.id === modalProject.id
    );
  }, [filteredProjects, modalProject]);

  const modalRatio = modalProject ? getProjectRatio(modalProject) : 1;
  const modalIsPortrait = modalRatio < 1;
  const hasMultipleImages = images.length > 1;

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

              {hasMultipleImages && (
                <div className="
                  absolute bottom-3 right-3 z-20
                  px-2 py-1 text-xs rounded
                  bg-black/60 text-white
                ">
                  {imageIndex + 1} / {images.length}
                </div>
              )}

              <ImageSlider
                images={images}
                video={modalProject.type === "video" ? modalProject.video : null}
                imageIndex={imageIndex}
                setImageIndex={setImageIndex}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-[#AED4FF] mb-2">
                {modalProject.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-200 mb-4">
                {modalProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {modalProject.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      inline-flex items-center
                      px-3 py-1
                      text-xs sm:text-sm
                      font-medium
                      rounded-full

                      bg-blue-50 text-blue-700
                      border border-blue-200

                      dark:bg-[#0f2a44]
                      dark:text-[#AED4FF]
                      dark:border-[#1f3b5c]

                      bg-gradient-to-r from-blue-50 to-blue-100
                    dark:from-[#0f2a44] dark:to-[#163a5c]

                      transition-colors
                      hover:bg-blue-100
                      dark:hover:bg-[#163a5c]
                    "
                  >
                    {tag}
                  </span>

                ))}
              </div>

              <div className="flex flex-col gap-2 mb-6">
                {modalProject.links?.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-4 py-2 rounded-md text-sm font-medium text-center
                      bg-[#194a7a] text-white
                      dark:bg-[#AED4FF] dark:text-[#0a192f]
                      hover:brightness-110 transition
                    "
                  >
                    {link.text}
                  </a>
                ))}
              </div>

              <div className="
                mt-auto pt-4
                flex justify-between
                border-t border-gray-200 dark:border-white/15
              ">
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
                src={images[imageIndex]}
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
