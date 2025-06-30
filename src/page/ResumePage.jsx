import React, { useEffect } from "react";

import Footer from "../components/Footer";
import AnimatedPage from "./AnimatedPage";
import Navbar from "../components/Navbar";
import Resume from "../components/Resume";

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return (
        <AnimatedPage>
            <div className=" bg-[#0A1926]">
                <Navbar />
                <Resume />
                <Footer />
            </div>
        </AnimatedPage>
    );
};

export default ContactPage;
