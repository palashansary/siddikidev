import React from "react";
import AnimatedPage from "./AnimatedPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dash from "../components/Dash";

const Dashboard = () => {
  return (
    <AnimatedPage>
      <Navbar />
      <Dash />
      <Footer />
    </AnimatedPage>
  );
};

export default Dashboard;
