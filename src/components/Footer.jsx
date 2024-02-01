import React from "react";

import newogo from "../images/newlogo.webp";

import github from "../images/3d/github.webp";
import gmail from "../images/3d/gmail.webp";
import facebook from "../images/3d/facebook.webp";
import linkedin from "../images/3d/linkedin.webp";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className=" h-full md:h-[160px] border-t border-blue-800 bg-black/[0.1] ">
        <div className="text-left pt-6 pb-4 px-6   md:px-16 h-full flex flex-col   md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col ">
            <div className="h-[35px] md:h-[50px]">
              <img src={newogo} className="h-full " />
            </div>
            <div>
              <p className="text-white text-[0.8rem] md:text-[1.2rem] font-semibold  mt-2 w-4/6 lg:w-full ">
                Innovating Next-gen web apps that meet the needs of users
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start mt-4 md:mt-0">
            <div className="pl-1">
              <p className="text-slate-100 text-[1.1rem] font-semibold font-opensans">
                Connects with me
              </p>
            </div>
            <div className="mt-3 flex gap-1">
              <div className="h-[45px] md:h-[60px] cursor-pointer">
                <a href="https://www.linkedin.com/in/abdul-hai-siddiki-ansary-345433285/">
                  <img src={linkedin} className="h-full" />
                </a>
              </div>
              <div className="h-[45px] md:h-[60px] cursor-pointer">
                <a href="mailto:palashansary@gmail.com">
                  <img src={gmail} className="h-full" />
                </a>
              </div>
              <div className="h-[45px] md:h-[60px] cursor-pointer">
                <Link to="https://github.com/palashansary">
                  <img src={github} className="h-full" />
                </Link>
              </div>

              <div className="h-[45px] md:h-[60px] cursor-pointer">
                <img src={facebook} className="h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
