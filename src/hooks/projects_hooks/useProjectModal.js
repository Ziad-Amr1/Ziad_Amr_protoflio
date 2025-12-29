// src/hooks/projects_hooks/useProjectModal.js
import { useState, useEffect, useCallback } from "react";

export default function useProjectModal(
  projectsData,
  filteredProjects,
  getImages
) {
  const [modalProject, setModalProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  // =========================
  // Open modal (ONLY place that pushes history)
  // =========================
  const openModal = useCallback((project) => {
    setModalProject(project);
    setImageIndex(0);

    try {
      const token = `project-${project.id}`;
      if (window.location.hash !== `#${token}`) {
        window.history.pushState(
          { projectId: project.id },
          "",
          `#${token}`
        );
      }
    } catch (e) {
      // ignore history errors (SSR / restricted env)
    }
  }, []);

  // =========================
  // Close modal
  // =========================
  const closeModal = useCallback(() => {
    setModalProject(null);
    setImageIndex(0);

    try {
      const clean =
        window.location.pathname + window.location.search;
      window.history.replaceState({}, "", clean);
    } catch (e) {
      if (window.location.hash?.startsWith("#project-")) {
        window.location.hash = "";
      }
    }
  }, []);

  // =========================
  // Navigate between projects (REPLACE history)
  // =========================
  const handlePrevProject = useCallback(() => {
    if (!modalProject) return;

    const idx = filteredProjects.findIndex(
      (p) => p.id === modalProject.id
    );

    if (idx > 0) {
      const prev = filteredProjects[idx - 1];

      try {
        window.history.replaceState(
          { projectId: prev.id },
          "",
          `#project-${prev.id}`
        );
      } catch (e) {}

      setModalProject(prev);
      setImageIndex(0);
    }
  }, [modalProject, filteredProjects]);

  const handleNextProject = useCallback(() => {
    if (!modalProject) return;

    const idx = filteredProjects.findIndex(
      (p) => p.id === modalProject.id
    );

    if (idx < filteredProjects.length - 1) {
      const next = filteredProjects[idx + 1];

      try {
        window.history.replaceState(
          { projectId: next.id },
          "",
          `#project-${next.id}`
        );
      } catch (e) {}

      setModalProject(next);
      setImageIndex(0);
    }
  }, [modalProject, filteredProjects]);

  // =========================
  // Sync with browser back / forward
  // =========================
  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash || "";

      if (!hash.startsWith("#project-")) {
        setModalProject(null);
        setImageIndex(0);
        return;
      }

      const id = Number(hash.replace("#project-", ""));
      const found = projectsData.find((p) => p.id === id);

      if (found) {
        setModalProject(found);
        setImageIndex(0);
      } else {
        setModalProject(null);
        setImageIndex(0);
      }
    };

    window.addEventListener("popstate", onPop);

    // Handle initial hash on load
    const initialHash = window.location.hash || "";
    if (initialHash.startsWith("#project-")) {
      const id = Number(initialHash.replace("#project-", ""));
      const found = projectsData.find((p) => p.id === id);
      if (found) {
        setModalProject(found);
        setImageIndex(0);
      }
    }

    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, [projectsData]);

  // =========================
  // Keyboard navigation
  // =========================
  useEffect(() => {
    const onKey = (e) => {
      if (!modalProject) return;

      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (e.key === "ArrowLeft") {
        if (imageIndex > 0) {
          setImageIndex((i) => i - 1);
        } else {
          handlePrevProject();
        }
      }

      if (e.key === "ArrowRight") {
        const imgs = getImages(modalProject);

        if (imageIndex < imgs.length - 1) {
          setImageIndex((i) => i + 1);
        } else {
          handleNextProject();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    modalProject,
    imageIndex,
    closeModal,
    getImages,
    handlePrevProject,
    handleNextProject,
  ]);

  // =========================
  // Body scroll lock (SAFE & CENTRALIZED)
  // =========================
  useEffect(() => {
    if (modalProject) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalProject]);

  // =========================
  // Close modal if filter changes and project disappears
  // =========================
  useEffect(() => {
    if (
      modalProject &&
      !filteredProjects.some(
        (p) => p.id === modalProject.id
      )
    ) {
      closeModal();
    }
  }, [filteredProjects, modalProject, closeModal]);

  // =========================
  // Public API
  // =========================
  return {
    modalProject,
    imageIndex,
    setImageIndex,
    openModal,
    closeModal,
    handlePrevProject,
    handleNextProject,
  };
}
