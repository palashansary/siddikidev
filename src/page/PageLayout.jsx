import React from "react";
import AnimatedPage from "./AnimatedPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";

const PageLayout = ({ title, children }) => {
  usePageTitle(title);
  return (
    <AnimatedPage>
      <div className="bg-[#0A1926] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AnimatedPage>
  );
};

export default PageLayout;
