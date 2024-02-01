import React, { useEffect, useRef } from "react";

import Home from "../components/Home";

import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import AnimatedPage from "./AnimatedPage";
import Navbar from "../components/Navbar";
import About from "../components/About";

const HomePage = () => {
  const aboutSectionRef = useRef(null);

  const scrollToAboutSection = () => {
    aboutSectionRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <AnimatedPage>
      <div>
        <div className=" bg-[#0A1926] relative">
          <Navbar onClickScroll={scrollToAboutSection} />
          <Home onClickScroll={scrollToAboutSection} />

          <About ref={aboutSectionRef} />
          <Projects onHomePage={true} />
          <Skills />
          <Footer />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default HomePage;
