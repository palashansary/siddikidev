import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import newLogo from "../images/newlogo.webp";
import cv from "../images/cv.webp";

import { GiHamburgerMenu } from "react-icons/gi";

import { AiOutlineClose } from "react-icons/ai";
import siddiki_frontend_dev from "../cv/siddiki_frontend_dev.pdf";

const Navbar = ({ onClickScroll }) => {
  const location = useLocation();
  const bodyElement = document.querySelector("body");
  const [activeMenu, setActiveMenu] = useState(false);

  const menuShowHandler = () => {
    setActiveMenu(true);

    bodyElement.classList.add("overflow-hidden");
  };

  const menuCloseHandler = () => {
    setActiveMenu(false);
    bodyElement.classList.remove("overflow-hidden");
  };

  const cvDownloadHandler = () => {
    console.log("clicked");
    const link = document.createElement("a");
    link.href = siddiki_frontend_dev;
    link.download = "siddiki_frontend_dev.pdf";
    link.click();
  };

  return (
    <div className="h-14 sticky  top-0 left-0 z-50">
      <div className="text-white w-full h-14 sticky  top-0 left-0  backdrop-blur-lg flex items-center justify-between  p-5 md:px-14 md:py-9 ">
        <div className="h-14 flex items-center">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={newLogo} alt="logo" className="h-8 md:h-12 " />
          </Link>
        </div>

        <div className="flex gap-8 h-full items-center">
          <div className="hidden sm:flex gap-8 h-full items-center text-[1.12rem] font-semibold font-bricolage ">
            {location.pathname !== "/" && (
              <div>
                <Link to="/">
                  <p className="hover:text-gray-200">Home</p>
                </Link>
              </div>
            )}

            {location.pathname === "/" && (
              <div>
                <div className="cursor-pointer" onClick={onClickScroll}>
                  <p className="hover:text-gray-200">About</p>
                </div>
              </div>
            )}

            <div>
              <Link to="/projects">
                <p className="hover:text-gray-200">Projects</p>
              </Link>
            </div>

            <div>
              <Link to="/contact">
                <p className="hover:text-gray-200">Contact</p>
              </Link>
            </div>
          </div>

          <div className="flex flex-row h-14 justify-center items-center">
            {/* CV ICONS STARTS */}
            <div
              className="flex gap-2 items-center cursor-pointer  sm:border h-9 sm:px-2 sm:py-0 sm:rounded-lg sm:bg-black/[0.6] pr-6 sm:pr-2  sm:hover:scale-95 duration-300 "
              onClick={cvDownloadHandler}
            >
              <img src={cv} className=" h-6 md:h-5 " />
              <p className="font-robotomono text-[14px] font-semibold hidden sm:block">
                Resume
              </p>
            </div>

            {/* CV ICONS ENDS  */}

            {/* HAMBURGER MENU STARTS */}

            {!activeMenu && (
              <div
                className="cursor-pointer sm:hidden"
                onClick={menuShowHandler}
              >
                <GiHamburgerMenu size="1.6rem" color="" />
              </div>
            )}

            {/* HAMBURGER MENU ENDS  */}

            {/* CLOSE ICON STARTS  */}

            {activeMenu && (
              <div
                className="cursor-pointer sm:hidden"
                onClick={menuCloseHandler}
              >
                <AiOutlineClose size="1.6rem" color="" />
              </div>
            )}

            {/* CLOSE ICON ENDS  */}
          </div>
        </div>

        {/* MOBILE NAVBAR STARTS */}
        {activeMenu && (
          <div
            className="fixed top-14 left-0 h-[96.5vh]
        w-full bg-black/[0.92] backdrop-blur-xl   z-50 "
          >
            <div className="flex justify-center mt-10">
              <ul className="flex flex-col items-center gap-y-4 text-[1.5rem] font-semibold  font-bricolage">
                {location.pathname !== "/" && (
                  <li>
                    <Link to="/" onClick={menuCloseHandler}>
                      Home
                    </Link>
                  </li>
                )}

                {location.pathname === "/" && (
                  <li>
                    <div
                      onClick={() => {
                        onClickScroll();
                        menuCloseHandler();
                      }}
                    >
                      About
                    </div>
                  </li>
                )}

                <li onClick={menuCloseHandler}>
                  <Link to="/projects">Projects</Link>
                </li>

                <li onClick={menuCloseHandler}>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>

              <div className="absolute top-[34%]">
                <p
                  className="font-robotomono text-[1rem] px-2 py-1 border rounded-md bg-black/[0.95]"
                  onClick={() => {
                    cvDownloadHandler();
                    menuCloseHandler();
                  }}
                >
                  Download CV
                </p>
              </div>
            </div>
          </div>
        )}
        {/* MOBILE NAVBAR ENDS */}
      </div>
    </div>
  );
};

export default Navbar;
