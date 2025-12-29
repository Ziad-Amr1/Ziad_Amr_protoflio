export function useModalHistory(setModal) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#project-")) {
      const id = hash.replace("#project-", "");
      setModal(id);
    }

    const handler = () => {
      const h = window.location.hash;
      if (h.startsWith("#project-")) {
        setModal(h.replace("#project-", ""));
      } else {
        setModal(null);
      }
    };

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [setModal]);
}