// src/hooks/useHeader.js
import { useState, useEffect } from "react";

export function useHeader(sidebarRef, toggleButtonRef) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // إذا لم تكن القائمة مفتوحة، لا داعي لإضافة المستمعين
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      // إغلاق القائمة إذا تم النقر خارج الـ sidebar أو الزر
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => setMenuOpen(false);

    // إضافة المستمعين
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // تنظيف المستمعين عند إغلاق القائمة أو إلغاء تحميل المكون
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen, sidebarRef, toggleButtonRef]);

  return { menuOpen, setMenuOpen };
}
