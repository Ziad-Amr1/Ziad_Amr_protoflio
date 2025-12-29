import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      {/* Header for all pages */}
      <Navbar />

      {/* All pages in layout */}
      <MainLayout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </MainLayout>
    </>
  );
}

export default App;
