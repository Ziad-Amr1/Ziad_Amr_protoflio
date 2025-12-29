// src/hooks/useScrollToSection.js
import { useEffect } from "react";

export default function useScrollToSection() {
  useEffect(() => {
    const handleClick = (e) => {
      // 🔹 التأكد أن العنصر المضغوط داخل رابط يبدأ بـ "#"
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      e.preventDefault();

      // 🔹 تحديد القسم المستهدف من الرابط
      const targetSelector = anchor.getAttribute("href");
      const target = document.querySelector(targetSelector);
      if (!target) return;

      // 🔹 تحديد الهيدر (في حال وجوده) لحساب الإزاحة
      const header = document.querySelector("header");
      const headerHeight = header?.offsetHeight || 0;

      // 🔹 حساب الموضع الصحيح للتمرير (مع خصم ارتفاع الهيدر)
      const offset = target.offsetTop - headerHeight;

      // 🔹 تمرير سلس للقسم المستهدف
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    };

    // ✅ إضافة المستمع للنقرات على الروابط
    document.addEventListener("click", handleClick);

    // 🧹 تنظيف الحدث عند إلغاء التفعيل
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}
