import React, { useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import newLogo from "../images/newlogo.webp";
import cv from "../images/cv.webp";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSiteContent } from "../context/ContentContext";

const navItems = [
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

// Green underline that slides in on hover and stays under the active page.
const underline =
  "relative transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-green-400 after:transition-transform after:duration-300";
const idleLinkClass = `${underline} after:scale-x-0 hover:after:scale-x-100 hover:text-gray-200`;
const desktopLinkClass = ({ isActive }) =>
  isActive ? `${underline} after:scale-x-100 text-green-400` : idleLinkClass;

const menuVariants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, staggerChildren: 0.06, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};
const menuItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

// Thin bar in the logo's purple → pink that fills as the page scrolls.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute left-0 right-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-purple-700 via-fuchsia-600 to-rose-500"
    />
  );
};

const Navbar = ({ onClickScroll }) => {
  const location = useLocation();
  const { resume } = useSiteContent().content;
  const [activeMenu, setActiveMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open, and always release it
  // when the menu closes or this component unmounts (e.g. on navigation).
  useEffect(() => {
    if (!activeMenu) return;
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [activeMenu]);

  useEffect(() => {
    setActiveMenu(false);
  }, [location.pathname]);

  const menuCloseHandler = () => setActiveMenu(false);

  const scrollToAbout = () => {
    menuCloseHandler();
    onClickScroll?.();
  };

  return (
    <header className="h-14 sticky top-0 left-0 z-50">
      <nav
        className={`text-white w-full h-14 backdrop-blur-lg flex items-center justify-between  p-5 md:px-14 md:py-9 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/30" : ""
        }`}
      >
        <div className="h-14 flex items-center">
          <Link
            to="/"
            aria-label="Home"
            onClick={() => {
              menuCloseHandler();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src={newLogo}
              alt="AHSA logo"
              className="h-8 md:h-12 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        <div className="flex gap-8 h-full items-center">
          <div className="hidden sm:flex gap-8 h-full items-center text-[1.12rem] font-semibold font-bricolage ">
            {isHome ? (
              <button type="button" className={idleLinkClass} onClick={scrollToAbout}>
                About
              </button>
            ) : (
              <Link to="/" className={idleLinkClass}>
                Home
              </Link>
            )}

            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={desktopLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-row h-14 justify-center items-center">
            {/* CV ICONS STARTS */}
            <Link
              to="/resume"
              aria-label="Resume"
              className="flex gap-2 items-center cursor-pointer  sm:border h-9 sm:px-2 sm:py-0 sm:rounded-lg sm:bg-black/[0.6] pr-6 sm:pr-2  sm:hover:scale-95 duration-300 "
            >
              <img src={cv} alt="" className=" h-6 md:h-5 " />
              <div className="font-robotomono text-[14px] font-semibold hidden sm:block">
                Resume
              </div>
            </Link>
            {/* CV ICONS ENDS  */}

            <button
              type="button"
              className="cursor-pointer sm:hidden"
              aria-label={activeMenu ? "Close menu" : "Open menu"}
              aria-expanded={activeMenu}
              onClick={() => setActiveMenu((open) => !open)}
            >
              <motion.span
                key={activeMenu ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {activeMenu ? (
                  <AiOutlineClose size="1.6rem" />
                ) : (
                  <GiHamburgerMenu size="1.6rem" />
                )}
              </motion.span>
            </button>
          </div>
        </div>

        {/* MOBILE NAVBAR STARTS */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-14 inset-x-0 h-[calc(100dvh_-_3.5rem)] bg-black/[0.92] backdrop-blur-xl z-50 sm:hidden"
            >
              <div className="flex flex-col items-center mt-10 gap-y-10">
                <ul className="flex flex-col items-center gap-y-4 text-[1.5rem] font-semibold  font-bricolage">
                  <motion.li variants={menuItemVariants}>
                    {isHome ? (
                      <button type="button" onClick={scrollToAbout}>
                        About
                      </button>
                    ) : (
                      <Link to="/" onClick={menuCloseHandler}>
                        Home
                      </Link>
                    )}
                  </motion.li>
                  {navItems.map((item) => (
                    <motion.li key={item.to} variants={menuItemVariants}>
                      <Link to={item.to} onClick={menuCloseHandler}>
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  variants={menuItemVariants}
                  href={resume.url}
                  download={resume.fileName || true}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={menuCloseHandler}
                  className="font-robotomono text-[1rem] px-2 py-1 border rounded-md bg-black/[0.95]"
                >
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* MOBILE NAVBAR ENDS */}
      </nav>
      <ScrollProgress />
    </header>
  );
};

export default Navbar;
