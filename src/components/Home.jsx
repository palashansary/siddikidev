import React from "react";

import { Link } from "react-router-dom";

// webp imports

import hero2 from "../images/hero2.webp";

const Home = ({ onClickScroll }) => {
  return (
    <div>
      <div className="h-full lg:h-[calc(100vh-3.5rem)] flex flex-col md:flex-row md:justify-between bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-2">
        <div className="text-3xl text-white flex justify-center items-center md:pl-12 lg:pl-16 py-4  md:py-6  md:h-full md:w-[60vw] mt-2 md:mt-0">
          <div>
            <div>
              <p className="text-[1.8rem] sm:text-[2.2rem] md:text-[2rem] lg:text-[3.4rem] text-center md:text-left md:leading-[2.8rem] lg:leading-[3.5rem] font-bold px-5 mt-2 md:mt-0 font-roboto ">
                Inspiring Innovation, Transforming Web Experiences.
              </p>
            </div>

            <div className="mt-5 md:mt-10 w-full block lg:hidden text-center">
              <p className="px-8 md:px-4 lg:px-8 text-center text-[14px] leading-[16px] font-opensans">
                I am Siddki, a Web app developer skilled in Next.js and
                Tailwind. Creating exceptional web experiences by blending
                cutting-edge technologies with a keen eye for detail.
              </p>
            </div>
            <div className="flex gap-6 justify-center md:justify-start md:px-5 mt-5">
              <button className="border px-4  text-[16px]  md:text-[14px]  lg:text-[20px]  font-semibold rounded-lg bg-slate-950 font-roboto">
                <Link to="https://www.linkedin.com/in/siddiki-345433285/">
                  Get in touch
                </Link>
              </button>

              <button
                className="border px-4  text-[16px] md:text-[20px]  lg:text-[22px]  font-semibold rounded-xl  bg-[#32CD32]  flex items-center font-roboto"
                onClick={onClickScroll}
              >
                <p className="drop-shadow-md">Explore</p>
              </button>
            </div>
            <div className="md:mt-10 w-full hidden lg:block md:px-5">
              <p className="md:mt-6 w-10/12 text-center md:text-left text-[16px] md:text-[16px] md:leading-[18px] xl:text-[18px] xl:leading-[20px]  font-robotomono">
                I am Siddiki, a Web app developer skilled in React Js and
                Tailwind. Creating exceptional web experiences by blending
                cutting-edge technologies with a keen eye for detail.
              </p>
            </div>
          </div>
        </div>

        <div className="md:h-full md:w-[50%] flex justify-center">
          <img src={hero2} className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Home;
