// src/components/projects/ProjectModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImageSlider from "./ImageSlider";

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
  if (!modalProject) return null;

  const modalRatio = getProjectRatio(modalProject);
  const modalIsPortrait = modalRatio < 1;
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const images = getImages(modalProject);
  const hasMultipleImages = images.length > 1;

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
                className={`
                  absolute z-20 p-2 rounded-full
                  bg-black/60 text-white
                  hover:bg-black/80 transition
                  ${modalIsPortrait ? "top-3 right-3" : "top-3 left-3"}
                `}
                title="View full image"
              >
                ⛶
              </button>
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
              {hasMultipleImages && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => Math.max(i - 1, 0))}
                    className="
                      absolute left-3 top-1/2 -translate-y-1/2 z-20
                      p-2 rounded-full
                      bg-black/60 text-white
                      hover:bg-black/80
                    "
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => Math.min(i + 1, images.length - 1))}
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2 z-20
                      p-2 rounded-full
                      bg-black/60 text-white
                      hover:bg-black/80
                    "
                  >
                    ›
                  </button>
                </>
              )}
              <div className="w-full h-full flex items-center justify-center">
                <ImageSlider
                  images={images}
                  video={modalProject.type === "video" ? modalProject.video : null}
                  imageIndex={imageIndex}
                  setImageIndex={setImageIndex}
                />
              </div>
            </div>
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
                      text-xs px-2 py-1 rounded
                      bg-accent2 text-white
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
                      bg-blue-600 text-white dark:bg-[#AED4FF] dark:text-[#0a192f]
                      hover:brightness-110
                      transition
                    "
                  >
                    {link.text}
                  </a>
                ))}
              </div>
              <div
                className="
                  mt-auto pt-4
                  flex justify-between
                  border-t border-gray-200 dark:border-white/15
                "
              >
                <button
                  onClick={handlePrevProject}
                  disabled={
                    filteredProjects.findIndex((p) => p.id === modalProject.id) === 0
                  }
                  className="
                    px-4 py-2 rounded-md font-medium
                    bg-blue-600 text-white dark:bg-[#AED4FF] dark:text-[#0a192f]
                    hover:brightness-110
                    disabled:bg-gray-400
                    disabled:text-gray-700
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  « Previous
                </button>
                <button
                  onClick={handleNextProject}
                  disabled={
                    filteredProjects.findIndex((p) => p.id === modalProject.id) === filteredProjects.length - 1
                  }
                  className="
                    px-4 py-2 rounded-md font-medium
                    bg-blue-600 text-white dark:bg-[#AED4FF] dark:text-[#0a192f]
                    hover:brightness-110
                    disabled:bg-gray-400
                    disabled:text-gray-700
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  Next »
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {isImageFullscreen && (
            <motion.div
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