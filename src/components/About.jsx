import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { fadeInUp } from "../utils/motionVariants";

/* =========================
   Animation Container
========================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* =========================
   Reusable About Card
========================= */

function AboutCard({ icon: Icon, title, align = "center", children }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="
        group
        bg-white/80 dark:bg-[#0f1e36]
        backdrop-blur-sm
        rounded-xl
        p-6
        border border-[#5B8DEF]/10 dark:border-[#9ECFFF]/15
        shadow-[0_10px_40px_rgba(79,127,217,0.12)]
        hover:shadow-[0_20px_60px_rgba(79,127,217,0.18)]
        hover:border-[#5B8DEF]/30
        transition-all duration-300
      "
    >
      {/* Icon */}
      <Icon className="text-4xl mb-4 text-[#4F7FD9] dark:text-[#9ECFFF]" aria-hidden="true" />

      {/* Title */}
      <h3
        className={`text-xl font-semibold mb-2 ${
          align === "left" ? "text-left" : "text-center"
        }`}
      >
        {title}
      </h3>

      {/* Divider */}
      <div
        className={`h-[2px] w-10 mb-4 ${
          align === "left" ? "" : "mx-auto"
        } bg-gradient-to-r from-[#4F7FD9] to-[#9ECFFF]`}
      />

      {/* Content */}
      <div
        className={`leading-relaxed text-gray-700 dark:text-gray-300 ${
          align === "left" ? "text-left" : "text-center"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* =========================
   About Section
========================= */

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-[5%]">
        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            text-3xl font-bold text-center mb-12
            bg-gradient-to-r from-[#4F7FD9] to-[#9ECFFF]
            bg-clip-text text-transparent
          "
        >
          About Me
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {/* Bio */}
          <AboutCard icon={FaUserTie} title="Bio" align="left">
            <p>
              I’m an <strong className="text-[#4F7FD9] dark:text-[#9ECFFF]">
                Architecture student
              </strong>{" "}
              passionate about blending design thinking with{" "}
              <strong className="text-[#4F7FD9] dark:text-[#9ECFFF]">
                front-end development
              </strong>.
              I enjoy transforming ideas into functional, visually balanced,
              and user-centered solutions.
            </p>

            <a
              href="#skills"
              className="
                inline-block mt-4 text-sm font-medium
                text-[#5B8DEF] hover:text-[#4F7FD9]
                dark:text-[#9ECFFF] dark:hover:text-[#B6DDFF]
                underline-offset-4 hover:underline
              "
            >
              Explore my skills →
            </a>
          </AboutCard>

          {/* Education */}
          <AboutCard icon={FaGraduationCap} title="Education" align="left">
            <ul className="list-disc list-inside text-left space-y-3">
              <li>
                <strong>BFA in Architecture</strong> — Helwan University
                <span className="ml-2 text-sm text-gray-500">
                  (2023 – 2028)
                </span>
              </li>
              <li>
                <strong>High School Diploma</strong> — Al-Shaheed Atef El-Sadat
                <span className="ml-2 text-sm text-gray-500">
                  (2022 – 2023)
                </span>
              </li>
            </ul>
          </AboutCard>

          {/* Experience */}
          <AboutCard icon={FaBriefcase} title="Experience" align="left">
            <ul className="list-disc list-inside text-left space-y-3">
              <li>
                Freelance Designer & Developer
                <span className="ml-2 text-sm text-gray-500">
                  (2024 – Present)
                </span>
              </li>
              <li>
                Architectural Academic Projects
                <span className="ml-2 text-sm text-gray-500">
                  (2023 – Present)
                </span>
              </li>
            </ul>
          </AboutCard>
        </motion.div>
      </div>
    </section>
  );
}
