// src/components/Hero.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { FaBehance, FaDribbble, FaGithub, FaLinkedin } from "react-icons/fa";
import useTypingEffect from "../hooks/useTypingEffect";

export default function Hero() {
const titles = useMemo(
  () => ["Frontend Developer", "UI/UX Designer", "Creative Coder"],
  []
);

const { text, blink } = useTypingEffect(titles);


  return (
    <section
      id="home"
      className={`relative flex flex-col-reverse md:flex-row items-center justify-center
      min-h-[calc(100vh-70px)]
      max-h-[calc(100vh-70px)]
      px-[6%] md:px-[10%] lg:px-[12%]
      py-6 sm:py-8 md:py-12
      overflow-hidden transition-all duration-700`}
    >
      <div
        className="flex flex-col-reverse md:flex-row items-center justify-between 
        gap-6 md:gap-12 lg:gap-16 
        p-5 md:p-8 rounded-2xl shadow-xl 
        bg-[#f8f8f8] dark:bg-[#112240] bg-opacity-80 backdrop-blur-sm 
        w-full max-w-[1200px] mx-auto h-fit md:h-auto"
      >
        {/* النص والمحتوى */}
        <motion.article
          className="text-center md:text-left max-w-xl md:max-w-[550px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* <p
            className="uppercase tracking-widest font-semibold mb-3 ${
             dark:text-[#AED4FF] text-blue-600"
          > */}
          <p className="uppercase tracking-widest font-semibold mb-3 text-blue-600 dark:text-[#AED4FF]">
            Hello, I'm
          </p>

          <h1
            className="
          text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold mb-3 
          leading-tight bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400

          dark:from-[#AED4FF] dark:via-[#8EC9FF] dark:to-[#E6F1FF]
          bg-clip-text text-transparent"
          >
            Ziad Amr
          </h1>

          <div className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-[#E6F1FF] mb-6 min-h-[32px]">
            <span>{text}</span>
            <span className="ml-1">{blink ? "|" : " "}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base md:text-lg">
            Passionate about crafting interactive, responsive, and visually
            engaging digital experiences that merge creativity with functionality.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {/* Contact */}
            <a
              href="#contact"
              className="px-6 py-3 rounded-full font-semibold border transition-all hover:shadow-lg
                  dark:border-[#AED4FF] dark:text-[#AED4FF] dark:hover:bg-[#AED4FF] dark:hover:text-[#0a192f]
                  border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white "
            >
              Get in Touch
            </a>

            {/* Download CV */}
            <a
              href="/images/Ziad_Amr_Said_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md transition-all
                        dark:bg-gradient-to-r from-[#AED4FF] to-[#E6F1FF] dark:hover:from-[#E6F1FF] dark:hover:to-[#AED4FF] dark:text-[#0a192f]
                        bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start gap-5 mt-8">
            {[
              {
                icon: <FaLinkedin />,
                link: "https://www.linkedin.com/in/ziadamrsaid/"
              },
              { 
                icon: <FaGithub />,
                link: "https://github.com/Ziad-Amr1/"
              },
              {
                icon: <FaBehance />,
                link: "https://www.behance.net/ziadamrsaid",
              },
              {
                icon: <FaDribbble />,
                link: "https://dribbble.com/ZiadAmrSaid",
              },
            ].map(({ icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="text-2xl transition-colors
              dark:text-[#AED4FF] dark:hover:text-[#8EC9FF] text-blue-600 hover:text-blue-500"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.article>

        {/* Profile Image */}
        <motion.figure
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 
          rounded-full overflow-hidden shadow-xl border-4 border-blue-500 dark:border-[#AED4FF] p-[3px] flex-shrink-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            loading="lazy"
            decoding="async"
            src="/images/profile.webp"
            alt="Ziad Amr"
            className="rounded-full w-full h-full object-cover object-top"
          />
        </motion.figure>
      </div>
    </section>
  );
}
