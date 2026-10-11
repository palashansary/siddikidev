import React, { useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

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

const desktopLinkClass = ({ isActive }) =>
  isActive ? "text-green-400" : "hover:text-gray-200";

const Navbar = ({ onClickScroll }) => {
  const location = useLocation();
  const { resume } = useSiteContent().content;
  const [activeMenu, setActiveMenu] = useState(false);
  const isHome = location.pathname === "/";

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
      <nav className="text-white w-full h-14 backdrop-blur-lg flex items-center justify-between  p-5 md:px-14 md:py-9 ">
        <div className="h-14 flex items-center">
          <Link
            to="/"
            aria-label="Home"
            onClick={() => {
              menuCloseHandler();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={newLogo} alt="AHSA logo" className="h-8 md:h-12 " />
          </Link>
        </div>

        <div className="flex gap-8 h-full items-center">
          <div className="hidden sm:flex gap-8 h-full items-center text-[1.12rem] font-semibold font-bricolage ">
            {isHome ? (
              <button type="button" className="hover:text-gray-200" onClick={scrollToAbout}>
                About
              </button>
            ) : (
              <Link to="/" className="hover:text-gray-200">
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
              {activeMenu ? (
                <AiOutlineClose size="1.6rem" />
              ) : (
                <GiHamburgerMenu size="1.6rem" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVBAR STARTS */}
        {activeMenu && (
          <div className="fixed top-14 inset-x-0 h-[calc(100dvh_-_3.5rem)] bg-black/[0.92] backdrop-blur-xl z-50 sm:hidden">
            <div className="flex flex-col items-center mt-10 gap-y-10">
              <ul className="flex flex-col items-center gap-y-4 text-[1.5rem] font-semibold  font-bricolage">
                <li>
                  {isHome ? (
                    <button type="button" onClick={scrollToAbout}>
                      About
                    </button>
                  ) : (
                    <Link to="/" onClick={menuCloseHandler}>
                      Home
                    </Link>
                  )}
                </li>
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} onClick={menuCloseHandler}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={resume.url}
                download={resume.fileName || true}
                target="_blank"
                rel="noopener noreferrer"
                onClick={menuCloseHandler}
                className="font-robotomono text-[1rem] px-2 py-1 border rounded-md bg-black/[0.95]"
              >
                Download CV
              </a>
            </div>
          </div>
        )}
        {/* MOBILE NAVBAR ENDS */}
      </nav>
    </header>
  );
};

export default Navbar;
