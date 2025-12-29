import React, { useRef } from "react";
import { Menu, X } from "lucide-react";

import { useHeader } from "../hooks/useSidebar";
import { useTheme } from "../context/ThemeContext";
import useScrollToSection from "../hooks/useScrollToSection";
import useActiveSection from "../hooks/useActiveSection";
import useScrollProgress from "../hooks/useScrollProgress";

import "./ThemeToggle.css";

export default function Header() {
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const { menuOpen, setMenuOpen } = useHeader(sidebarRef, toggleButtonRef);
  const { isDark, toggleTheme } = useTheme();

  useScrollToSection();

  const navLinks = ["Home", "About", "Skills", "Projects", "Contact"];

  const activeSection = useActiveSection(
    navLinks.map((l) => l.toLowerCase())
  );

  const scrollProgress = useScrollProgress();

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        h-[60px]
        px-[5%]
        grid grid-cols-[auto_1fr_auto] items-center gap-4

        bg-white/80 dark:bg-dark/70
        backdrop-blur-xl

        border-b border-primary/10 dark:border-accent1/10
        shadow-md dark:shadow-[0_0_25px_rgba(99,102,241,0.15)]


        transition-colors duration-300
      "
    >
      {/* Scroll Progress Indicator */}
      <div className="absolute top-0 left-0 w-full h-[2px]">
        <div
          className="
            h-full
            bg-primary dark:bg-accent1
            shadow-[0_0_10px_rgba(99,102,241,0.55)]
            transition-[width] duration-150 ease-out
          "
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Logo */}
      <a href="#home" className="no-underline">
        <h1
          className="
            text-xl lg:text-2xl font-extrabold
            leading-tight bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:text-light
            tracking-wide bg-clip-text text-transparent
          "
        >
          Ziad Amr
        </h1>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex justify-center">
        <ul className="flex gap-10 list-none m-0 p-0">
          {navLinks.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;

            return (
              <li key={item}>
                <a
                  href={`#${id}`}
                  className={`
                    relative font-semibold transition-colors duration-300
                    ${
                      isActive
                        ? "text-primary dark:text-accent1 drop-shadow-[0_0_6px_rgba(99,102,241,0.45)]"
                        : "text-dark/80 dark:text-light/80 hover:text-primary dark:hover:text-accent1"
                    }
                  `}
                >
                  {item}

                  {/* Animated underline */}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] w-full
                      origin-left scale-x-0
                      bg-primary dark:bg-accent1
                      transition-transform duration-300 ease-out
                      ${isActive && "scale-x-100"}
                    `}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <label className="switch">
          <input
            id="themeToggle"
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <div className="slider">
            {/* نفس محتوى الـ SVGs بتاعك بدون تغيير */}
            <div className="sun-moon">
              <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
            </div>
            <div className="stars">
              <svg id="star-1" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-2" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-3" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-4" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
            </div>
          </div>
        </label>

        {/* Mobile Menu Button */}
        <button
          ref={toggleButtonRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="
            md:hidden p-2 text-2xl
            text-primary dark:text-accent1
            hover:scale-110 transition
          "
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-[60px] right-0
          w-4/5 max-w-sm h-[calc(100vh-60px)]
          bg-white/90 dark:bg-dark/85
          backdrop-blur-xl
          shadow-xl
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav>
          <ul className="flex flex-col gap-6 p-8">
            {navLinks.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;

              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      font-semibold text-lg transition-colors
                      ${
                        isActive
                          ? "text-primary dark:text-accent1"
                          : "text-dark/80 dark:text-light/80 hover:text-primary dark:hover:text-accent1"
                      }
                    `}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
