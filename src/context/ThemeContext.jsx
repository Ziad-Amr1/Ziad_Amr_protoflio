// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 🔹 نقرأ التفضيل المحفوظ من localStorage
    const savedTheme = localStorage.getItem("theme");

    // 🔹 نقرأ تفضيل النظام (في حالة عدم وجود تفضيل محفوظ)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 🔹 نحدد الوضع المبدئي: المحفوظ أو حسب النظام
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    // 🔹 نحدث الحالة ونفعّل/نلغي كلاس الوضع الداكن في <html>
    
    document.documentElement.classList.toggle("dark", initialDark);
    // document.body.classList.toggle("dark", initialDark);
    setIsDark(initialDark);
  }, []);

  // 🔄 دالة التبديل بين الوضعين (ليلي / نهاري)
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      // document.body.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 🎯 هوك لاستخدام الثيم داخل أي مكون بسهولة
export function useTheme() {
  return useContext(ThemeContext);
}
