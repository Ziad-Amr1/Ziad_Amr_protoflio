import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTabs } from "../hooks/useTabs";
import { fadeInUp } from "../utils/motionVariants";
import { Code2 } from "lucide-react";

function Skills() {
  /* ===============================
     Identity Structure
  =============================== */

  const categories = [
    "Creative Foundation",
    "Frontend Engineering",
    "Expanding Horizons",
  ];

  const skillsData = {
    "Creative Foundation": {
      tagline:
        "Design thinking shaped by architectural structure and visual composition.",
      accent: "from-[#6EE7B7] to-[#3B82F6]",
      groups: [
        {
          title: "Architecture",
          skills: [
            {
              name: "Revit",
              level: "Core",
              note: "BIM modeling & structured workflows",
            },
            {
              name: "AutoCAD",
              level: "Used",
              note: "2D documentation & drafting",
            },
            {
              name: "SketchUp",
              level: "Used",
              note: "Concept & massing exploration",
            },
            { name: "Lumion", level: "Used", note: "Rendering & walkthroughs" },
            {
              name: "3ds Max",
              level: "Learning",
              note: "Visualization fundamentals",
            },
          ],
        },
        {
          title: "Graphic & Visual Design",
          skills: [
            {
              name: "Adobe Illustrator",
              level: "Used",
              note: "Icons & visual systems",
            },
            {
              name: "Adobe Photoshop",
              level: "Used",
              note: "Image refinement",
            },
          ],
        },
        {
          title: "UI / UX",
          skills: [
            {
              name: "Figma",
              level: "Core",
              note: "Interface design & prototyping",
            },
          ],
        },
      ],
    },

    "Frontend Engineering": {
      tagline:
        "Building scalable, component-driven interfaces with clean architecture.",
      accent: "from-[#4F7FD9] to-[#9ECFFF]",
      skills: [
        { name: "HTML5", level: "Core", note: "Semantic structure" },
        {
          name: "CSS3",
          level: "Core",
          note: "Responsive layouts & styling logic",
        },
        {
          name: "JavaScript",
          level: "Core",
          note: "Async logic & DOM handling",
        },
        { name: "React", level: "Core", note: "Component-based architecture" },
        {
          name: "TailwindCSS",
          level: "Core",
          note: "Utility-first design system",
        },
        { name: "Vite", level: "Used", note: "Modern dev tooling" },
        { name: "Git", level: "Used", note: "Version control workflows" },
        { name: "GitHub", level: "Used", note: "Collaboration & repositories" },
      ],
    },

    "Expanding Horizons": {
      tagline:
        "Exploring backend systems, data workflows, and interactive experimentation.",
      accent: "from-[#A78BFA] to-[#F472B6]",
      skills: [
        { name: "Node.js", level: "Learning", note: "Backend fundamentals" },
        { name: "Python", level: "Used", note: "Automation & scripting" },
        {
          name: "Data Engineering",
          level: "Learning",
          note: "Academic & practical exposure",
        },
        {
          name: "Game Development",
          level: "Exploring",
          note: "Interactive experiments",
        },
      ],
    },
  };

  /* ===============================
     Active Tab Logic
  =============================== */

  const { activeTab, changeTab } = useTabs(categories, "Frontend Engineering");

  /* ===============================
     Styling System
  =============================== */

  const baseTab =
    "relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-out cursor-pointer focus:outline-none text-sm sm:text-base";

  const inactiveTab =
    "bg-white/70 text-gray-700 dark:bg-[#0f1f36] dark:text-[#AED4FF] hover:bg-white/90 hover:text-gray-900 dark:hover:bg-[#162c4d] dark:hover:text-[#E6F1FF] hover:shadow-md hover:-translate-y-[1px]";

  const currentCategory = skillsData[activeTab] || skillsData[categories[0]];

  const activeTabStyle = `bg-gradient-to-r ${currentCategory.accent} text-white shadow-lg scale-[1.05]`;

  /* ===============================
     Level Styling Map
  =============================== */

  const levelStyles = {
    Core: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    Used: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Learning:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Exploring:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  };

  //
  // const sortedSkills = [...group.skills].sort((a, b) =>
  //   a.level === "Core" ? -1 : b.level === "Core" ? 1 : 0,
  // );

  /* ===============================
     Unified Skill Card
  =============================== */

  const SkillCard = ({ skill, index }) => {
    const imgName = skill.name.replace(/\s|\//g, "");
    const imgSrc = `/images/skills/${imgName}.webp`;
    const levelClass = levelStyles[skill.level] || "";
    const isCore = skill.level === "Core";

    return (
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
      >
        <div
          className={`
            h-full flex flex-col justify-between
            rounded-xl p-4
            bg-white dark:bg-[#112240]
            border border-gray-100 dark:border-[#1c2e4a]
            shadow-sm
            transition-all duration-300
            hover:shadow-lg hover:-translate-y-1
            ${isCore ? "ring-1 ring-emerald-400/40" : ""}
          `}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                relative w-10 h-10 flex items-center justify-center
                bg-gray-50 dark:bg-[#0e1b2e]
                rounded-md shrink-0
              "
              >
                <img
                  src={imgSrc}
                  alt={skill.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.querySelector("svg").style.opacity =
                      "1";
                  }}
                />
                <Code2 size={18} className="text-gray-400 absolute opacity-0" />
              </div>

              <p className="text-sm font-medium text-gray-800 dark:text-white truncate flex items-center gap-2">
                {isCore && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
                {skill.name}
              </p>
            </div>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${levelClass}`}
            >
              {skill.level}
            </span>
          </div>

          {skill.note && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
              {skill.note}
            </p>
          )}
        </div>
      </motion.div>
    );
  };

  /* ===============================
     Render
  =============================== */

  return (
    <section id="skills" className="py-16 md:py-20">
      {/* subtle background glow */}
      {/* <div className="absolute inset-0 -z-10 opacity-20 blur-3xl bg-gradient-to-r from-[#4F7FD9] via-transparent to-[#9ECFFF]" /> */}

      <div className="container mx-auto px-[5%]">
        {/* ================= Title ================= */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            className={`
            text-4xl md:text-5xl font-bold leading-tight
            md:leading-[1.15] pb-1
            bg-gradient-to-r ${currentCategory.accent}
            bg-clip-text text-transparent
          `}
          >
            Skills & Expertise
          </h2>

          {/* Dynamic tagline */}
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {currentCategory.tagline}
          </p>
        </motion.div>

        {/* ================= Tabs ================= */}
        <div
          className="
            mb-10
            grid grid-cols-2
            gap-3
            sm:flex sm:flex-wrap
            sm:justify-center
            sm:gap-4
            sm:mb-12
          "
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => changeTab(cat)}
              className={`
              ${baseTab}
              ${activeTab === cat ? activeTabStyle : inactiveTab}
              relative overflow-hidden
              w-full sm:w-auto
            `}
            >
              <span className="relative z-10">{cat}</span>

              {/* subtle animated underline */}
              {activeTab === cat && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ================= Grid ================= */}
        <motion.div
          key={activeTab}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="space-y-14"
        >
          {currentCategory.groups ? (
            currentCategory.groups.map((group, index) => {
              const isArchitecture = group.title === "Architecture";

              return (
                <div key={group.title} className="space-y-6">
                  {/* Subtle Divider */}
                  {index !== 0 && (
                    // <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${currentCategory.accent}`} />

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                  )}

                  {/* Group Title */}
                  <h3
                    className={`
                      tracking-wide
                      ${
                        isArchitecture
                          ? "text-2xl font-bold font-serif text-gray-800 dark:text-white"
                          : "text-lg font-semibold text-gray-600 dark:text-gray-300"
                      }
                    `}
                  >
                    {group.title}
                  </h3>

                  {/* Group Grid */}
                  <div className="grid gap-6 auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {group.skills.map((skill, i) => (
                      <SkillCard key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="grid gap-6 auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentCategory.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
