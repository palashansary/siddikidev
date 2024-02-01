import React, { useEffect } from "react";

import Projects from "../components/Projects";
import Footer from "../components/Footer";
import AnimatedPage from "./AnimatedPage";
import Navbar from "../components/Navbar";

const ProjectPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <AnimatedPage>
      <div className="bg-[#0A1926]">
        <Navbar />
        <Projects onHomePage={false} />
        <Footer />
      </div>
    </AnimatedPage>
  );
};

export default ProjectPage;
