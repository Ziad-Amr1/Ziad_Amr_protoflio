// src/components/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motionVariants";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_z2vzgbc";
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_g4zvyau";
const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "7nk4IjT-c2fZ1PBLk";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const emailIsValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!emailIsValid(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Sending message…");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "(No subject)",
          message: formData.message,
        },
        PUBLIC_KEY
      );

      toast.dismiss(loadingToast);
      toast.success("Message sent successfully ✨");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <Toaster position="bottom-center" />

      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-center
          text-blue-600 dark:text-[#AED4FF]"
        >
          Let’s work together
        </motion.h2>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Have a question or a project in mind? Feel free to reach out.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mt-10 p-6 sm:p-8 rounded-2xl
            bg-[#f8f8f8] dark:bg-[#112240]
            bg-opacity-80 backdrop-blur-sm
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            dark:shadow-[0_8px_30px_rgba(174,212,255,0.08)]
          "
        >
          {/* NAME */}
          <div className="relative mb-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className="
                peer w-full bg-transparent border-b-2
                border-gray-300 dark:border-gray-600
                focus:border-blue-600 dark:focus:border-[#AED4FF]
                outline-none py-2
                text-gray-700 dark:text-[#E6F1FF]
              "
              required
            />
            <label
              className="
                absolute left-0 top-2 text-sm text-gray-500 transition-all

                peer-focus:-translate-y-5
                peer-focus:text-xs
                peer-focus:text-blue-600
                dark:peer-focus:text-[#AED4FF]

                peer-not-placeholder-shown:-translate-y-5
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-blue-600
                dark:peer-not-placeholder-shown:text-[#AED4FF]
              "
            >
              Name
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="
                peer w-full bg-transparent border-b-2
                border-gray-300 dark:border-gray-600
                focus:border-blue-600 dark:focus:border-[#AED4FF]
                outline-none py-2
                text-gray-700 dark:text-[#E6F1FF]
              "
              required
            />
            <label
              className="
                absolute left-0 top-2 text-sm text-gray-500 transition-all

                peer-focus:-translate-y-5
                peer-focus:text-xs
                peer-focus:text-blue-600
                dark:peer-focus:text-[#AED4FF]

                peer-not-placeholder-shown:-translate-y-5
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-blue-600
                dark:peer-not-placeholder-shown:text-[#AED4FF]
              "
            >
              Email
            </label>
          </div>

          {/* SUBJECT */}
          <div className="relative mb-6">
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder=" "
              className="
                peer w-full bg-transparent border-b-2
                border-gray-300 dark:border-gray-600
                focus:border-blue-600 dark:focus:border-[#AED4FF]
                outline-none py-2
                text-gray-700 dark:text-[#E6F1FF]
              "
            />
            <label
              className="
                absolute left-0 top-2 text-sm text-gray-500 transition-all

                peer-focus:-translate-y-5
                peer-focus:text-xs
                peer-focus:text-blue-600
                dark:peer-focus:text-[#AED4FF]

                peer-not-placeholder-shown:-translate-y-5
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-blue-600
                dark:peer-not-placeholder-shown:text-[#AED4FF]
              "
            >
              Subject (optional)
            </label>
          </div>

          {/* MESSAGE */}
          <div className="relative mb-8">
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              className="
                peer w-full bg-transparent border-b-2
                border-gray-300 dark:border-gray-600
                focus:border-blue-600 dark:focus:border-[#AED4FF]
                outline-none py-2 resize-none
                text-gray-700 dark:text-[#E6F1FF]
              "
              required
            />
            <label
              className="
                absolute left-0 top-2 text-sm text-gray-500 transition-all

                peer-focus:-translate-y-5
                peer-focus:text-xs
                peer-focus:text-blue-600
                dark:peer-focus:text-[#AED4FF]

                peer-not-placeholder-shown:-translate-y-5
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-blue-600
                dark:peer-not-placeholder-shown:text-[#AED4FF]
              "
            >
              Message
            </label>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="
                px-7 py-3 rounded-full font-semibold
                bg-blue-600 text-white
                dark:bg-[#AED4FF] dark:text-[#0a192f]
                hover:scale-[1.02] transition
                disabled:opacity-60
              "
            >
              {loading ? "Sending…" : "Send message"}
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              I usually respond within 24 hours.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
