import React, { useRef } from "react";

import Home from "../components/Home";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import AnimatedPage from "./AnimatedPage";
import Navbar from "../components/Navbar";
import About from "../components/About";
import usePageTitle from "../hooks/usePageTitle";

const HomePage = () => {
  usePageTitle();
  const aboutSectionRef = useRef(null);

  const scrollToAboutSection = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedPage>
      <div className=" bg-[#0A1926] relative">
        <Navbar onClickScroll={scrollToAboutSection} />
        <main>
          <Home onClickScroll={scrollToAboutSection} />
          <About ref={aboutSectionRef} />
          <Projects onHomePage={true} />
          <Skills />
        </main>
        <Footer />
      </div>
    </AnimatedPage>
  );
};

export default HomePage;
