import { useEffect, useState } from "react";

export default function useActiveSection(sectionIds, offset = 80) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      let current = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}
