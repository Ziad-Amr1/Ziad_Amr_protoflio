import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTabs } from "../hooks/useTabs";
import { fadeInUp } from "../utils/motionVariants";

function Skills() {
  const categories = [
    "Architecture & BIM",
    "UI / Visual Design",
    "Frontend & Automation",
  ];

  const skillsData = {
    "Architecture & BIM": [
      { name: "AutoCAD", tags: ["Used"], note: "2D drawings & documentation" },
      { name: "Revit", tags: ["Core"], note: "BIM modeling & basic QTO" },
      { name: "SketchUp", tags: ["Used"], note: "Concept & massing models" },
      { name: "3ds Max", tags: ["Learning"], note: "Visualization basics" },
      { name: "Lumion", tags: ["Used"], note: "Rendering & walkthroughs" },
    ],

    "UI / Visual Design": [
      { name: "Figma", tags: ["Core"], note: "UI design & prototyping" },
      { name: "Adobe Photoshop", tags: ["Used"], note: "Image editing" },
      { name: "Adobe Illustrator", tags: ["Used"], note: "Icons & diagrams" },
      { name: "Adobe InDesign", tags: ["Used"], note: "Layouts & presentations" },
      { name: "Adobe Dimension", tags: ["Learning"], note: "3D mockups" },
      { name: "Adobe Premiere Pro", tags: ["Learning"], note: "Basic video editing" },
      { name: "Adobe XD", tags: ["Used"], note: "UI wireframes" },
    ],

    "Frontend & Automation": [
      { name: "HTML5", tags: ["Core"], note: "Semantic markup" },
      { name: "CSS3", tags: ["Core"], note: "Responsive layouts" },
      { name: "JavaScript", tags: ["Core"], note: "Logic & DOM handling" },
      { name: "Bootstrap", tags: ["Used"], note: "Quick layouts" },
      { name: "Vite", tags: ["Used"], note: "Dev environment" },
      { name: "React", tags: ["Core"], note: "Component-based UI" },
      { name: "TailwindCSS", tags: ["Core"], note: "Utility-first styling" },
      { name: "Git", tags: ["Used"], note: "Version control" },
      { name: "GitHub", tags: ["Used"], note: "Repositories & collaboration" },
      { name: "Node.js", tags: ["Learning"], note: "Backend basics" },
      { name: "Python", tags: ["Used"], note: "Automation & scripts" },
    ],
  };

  const { activeTab, changeTab } = useTabs(categories, "Architecture & BIM");
  const [openSkill, setOpenSkill] = useState(null);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-[5%]">
        {/* Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12
          text-blue-600 dark:text-[#AED4FF]"
        >
          Skills & Tools
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => changeTab(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition-all
                ${
                  activeTab === cat
                    // ? "bg-blue-600 text-white dark:bg-[#AED4FF] dark:text-[#0a192f]"
                    // : "bg-blue-100 text-blue-600 dark:bg-[#112240] dark:text-[#AED4FF]"
                    ? `
                    bg-blue-200 text-blue-800
                    dark:bg-[#162c4d] dark:text-[#E6F1FF]
                    shadow-sm scale-105
                  `
                  : `
                    bg-white/70 text-gray-700
                    dark:bg-[#0f1f36] dark:text-[#AED4FF]
                    hover:bg-white hover:shadow-sm
                  `
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {skillsData[activeTab].map((skill) => {
            const imgName = skill.name.replace(/\s|\//g, "");
            const imgSrc = `/images/skills/${imgName}.webp`;

            return (
              <div key={skill.name}>
                {/* ================= Mobile Card ================= */}
                <div
                  className="md:hidden
                  bg-[#f8f8f8] dark:bg-[#112240]
                  rounded-xl p-4 shadow-md cursor-pointer"
                  onClick={() =>
                    setOpenSkill(
                      openSkill === skill.name ? null : skill.name
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={imgSrc}
                      alt={skill.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <p className="text-sm font-medium text-gray-700 dark:text-[#E6F1FF]">
                      {skill.name}
                    </p>
                  </div>

                  {openSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 rounded-lg
                      bg-blue-50 text-blue-700
                      dark:bg-[#0f2a44] dark:text-[#E6F1FF]"
                    >
                      <div className="flex flex-wrap gap-1 mb-2">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full
                            bg-blue-100 text-blue-700
                            dark:bg-[#112240] dark:text-[#AED4FF]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs leading-snug">{skill.note}</p>
                    </motion.div>
                  )}
                </div>

                {/* ================= Desktop Card ================= */}
                <div className="hidden md:block group perspective">
                  <div
                    className="
                      relative h-40 rounded-xl
                      transition-transform duration-700
                      transform-style-preserve-3d
                      group-hover:rotate-y-180
                    "
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 backface-hidden
                      bg-[#f8f8f8] dark:bg-[#112240]
                      rounded-xl shadow-md
                      flex flex-col items-center justify-center gap-3
                      text-gray-700 dark:text-[#E6F1FF]"
                    >
                      <img
                        src={imgSrc}
                        alt={skill.name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                      <p className="text-sm font-medium">{skill.name}</p>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 backface-hidden rotate-y-180
                      rounded-xl p-3
                      bg-blue-50 text-blue-700
                      dark:bg-[#0f2a44] dark:text-[#E6F1FF]
                      flex flex-col justify-center gap-2"
                    >
                      <div className="flex flex-wrap gap-1">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full
                            bg-blue-100 text-blue-700
                            dark:bg-[#112240] dark:text-[#AED4FF]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs leading-snug">{skill.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
