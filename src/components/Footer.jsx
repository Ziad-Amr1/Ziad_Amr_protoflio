// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motionVariants";
import {
  FaLinkedin,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaLinkedin />, url: "https://linkedin.com/in/ziad-amr-ah17" },
  { icon: <FaGithub />, url: "https://github.com/Ziad-Amr1" },
  { icon: <FaBehance />, url: "https://www.behance.net/ZiadAmrSaid" },
  { icon: <FaDribbble />, url: "https://dribbble.com/yourprofile" },
  { icon: <FaEnvelope />, url: "mailto:zyadamr177@gmail.com" },
  { icon: <FaPhone />, url: "tel:01122708543" },
];

function Footer() {
  return (
    <footer
      className="
        mt-20 py-10
        border-t border-gray-200 dark:border-gray-700
        bg-[#f8f8f8] dark:bg-[#112240]
        bg-opacity-80 backdrop-blur-sm
        transition-colors duration-500
      "
    >
      <div className="container mx-auto px-[5%]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            flex flex-col-reverse md:flex-row
            items-center justify-between
            gap-6
          "
        >
          {/* Left: copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-800 dark:text-[#E6F1FF]">
              Ziad Amr
            </span>
            . All rights reserved.
          </p>

          {/* Right: social icons */}
          <div className="flex items-center gap-6 text-lg">
            {socialLinks.map(({ icon, url }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="social link"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="
                  text-gray-500 dark:text-[#AED4FF]
                  hover:text-blue-600
                  dark:hover:text-[#E6F1FF]
                  transition-colors
                "
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* subtle divider line */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

        {/* small closing note */}
        <p className="mt-6 text-xs text-center text-gray-400 dark:text-gray-500">
          Designed & built with care.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
