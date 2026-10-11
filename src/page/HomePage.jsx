import React, { useRef } from "react";

import Home from "../components/Home";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import AnimatedPage from "./AnimatedPage";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Experience from "../components/Experience";
import usePageTitle from "../hooks/usePageTitle";

const HomePage = () => {
  usePageTitle();
  const aboutSectionRef = useRef(null);

  const scrollToAboutSection = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedPage>
      <div className="relative">
        <Navbar onClickScroll={scrollToAboutSection} />
        <main>
          <Home onClickScroll={scrollToAboutSection} />
          <About ref={aboutSectionRef} />
          <Experience />
          <Projects onHomePage={true} />
          <Skills />
        </main>
        <Footer />
      </div>
    </AnimatedPage>
  );
};

export default HomePage;
