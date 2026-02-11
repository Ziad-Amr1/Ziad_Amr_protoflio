// src/components/projects/ProjectCard.jsx
import React, { useRef, useState, useEffect } from "react";
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

  const tagsContainerRef = useRef(null);
  const measureRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!tagsContainerRef.current || !measureRef.current) return;

    let frame;

    const calculateVisible = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const containerWidth = tagsContainerRef.current.offsetWidth;
        const tagChildren = Array.from(
          measureRef.current.querySelectorAll(".measure-tag"),
        );

        let totalWidth = 0;
        let count = 0;

        for (let i = 0; i < tagChildren.length; i++) {
          const child = tagChildren[i];

          const style = window.getComputedStyle(child);
          const margin =
            parseFloat(style.marginLeft) + parseFloat(style.marginRight);

          const fullWidth = child.offsetWidth + margin;

          const remaining = tagChildren.length - i - 1;
          let plusWidth = 0;

          if (remaining > 0) {
            const plusEl = measureRef.current.querySelector(".measure-plus");
            if (plusEl) {
              plusEl.textContent = `+${remaining}`;
              plusWidth = plusEl.offsetWidth;
            }
          }

          if (totalWidth + fullWidth + plusWidth > containerWidth) break;

          totalWidth += fullWidth;
          count++;
        }

        setVisibleCount((prev) => (prev !== count ? count : prev));
      });
    };

    calculateVisible();

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(tagsContainerRef.current);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [project.tags]);

  const visibleTags = project.tags?.slice(0, visibleCount) || [];
  const hiddenCount =
    project.tags && project.tags.length > visibleCount
      ? project.tags.length - visibleCount
      : 0;

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
      {/* === thumbnail === */}
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
            transition-all duration-500
            group-hover:scale-105
            ${loadedMap[project.id] ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>

      {/* === content === */}
      <div className="p-4 relative">
        {/* === title === */}
        <h3
          title={project.title}
          className="font-semibold text-lg text-blue-600 dark:text-[#8EC9FF] mb-1 truncate"
        >
          {project.title}
        </h3>

        {/* === description === */}
        <p className="text-sm text-gray-600 dark:text-gray-300/90 line-clamp-2 mb-3">
          {project.description}
        </p>

        {/* === chips === */}
        <div ref={tagsContainerRef} className="flex gap-2 overflow-hidden">
          {visibleTags.map((t, i) => (
            <span
              key={i}
              title={t}
              className="text-xs bg-blue-200 text-blue-800 dark:bg-[#162c4d] dark:text-[#AED4FF] px-2 py-1 rounded whitespace-nowrap"
            >
              {t}
            </span>
          ))}

          {hiddenCount > 0 && (
            <span className="text-xs bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded">
              +{hiddenCount}
            </span>
          )}
        </div>
        <div
          ref={measureRef}
          className="absolute invisible whitespace-nowrap pointer-events-none"
        >
          {project.tags?.map((t, i) => (
            <span
              key={i}
              className="measure-tag text-xs px-2 py-1 rounded mr-2 whitespace-nowrap"
            >
              {t}
            </span>
          ))}

          <span className="measure-plus text-xs px-2 py-1 rounded mr-2">
            +99
          </span>
        </div>
      </div>
    </motion.article>
  );
}
