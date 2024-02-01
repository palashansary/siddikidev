import React from "react";

import html from "../images/3d/html.webp";
import css from "../images/3d/css.webp";
import js from "../images/3d/js.webp";
import react from "../images/3d/react.webp";
import github from "../images/3d/github.webp";
import css2 from "../images/3d/css2.webp";
import redux from "../images/iconsredux/redux.webp";
import next from "../images/iconsredux/next.webp";
import tailwind from "../images/iconsredux/tailwind.webp";

const Skills = () => {
  return (
    <div>
      <div className="h-full  py-8 md:pt-4 md:pb-10 flex flex-col justify-center md:justify-start md:mt-8 items-center">
        <div className="md:w-[90%] text-start ">
          <p className=" text-[2rem] md:text-[2.2rem] font-bold mb-8 line-clamp-6  font-bricolage text-blue-500">
            My Tech Stacks
          </p>
        </div>

        {/* TECH STACK BOX STARTS HERE */}
        <div className="flex gap-6 md:gap-8 flex-wrap justify-center md:justify-start items-center md:w-[90%] ">
          <div className="h-[120px] w-[120px] md:h-[150px]  md:w-[150px] bg-white flex justify-center items-start rounded-lg   bg-gradient-to-r from-rose-400 to-red-500">
            <div className="h-[116px] w-[116px] md:h-[140px]  md:w-[140px]">
              <img src={html} className="h-full w-full" />
            </div>
          </div>
          <div className="h-[120px] w-[120px] md:h-[150px]  md:w-[150px] bg-white flex justify-center items-center rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-400">
            <div className="h-[100px] [100px] md:h-[140px] w- md:w-[140px]">
              <img src={css2} className="h-full w-full" />
            </div>
          </div>
          <div className="h-[120px] [120px] md:h-[150px] w- md:w-[150px] bg-white flex justify-center items-center rounded-lg bg-gradient-to-r from-amber-200 to-yellow-300">
            <div className="h-[116px] w-[120px] md:h-[140px]  md:w-[140px]">
              <img src={js} className="h-full w-full" />
            </div>
          </div>

          <div className="h-[120px] w-[120px] md:h-[150px]  md:w-[150px] flex justify-center items-center rounded-lg bg-gradient-to-r from-violet-800 to-violet-800">
            <div className="h-[100px] w-[100px] md:h-[110px]  md:w-[110px] flex justify-center items-center  bg-white rounded-2xl">
              <div className="h-[90px] w-[90px] md:h-[100px] md:w-[100px] ">
                <img src={react} className="h-full w-full " />
              </div>
            </div>
          </div>

          <div className="h-[120px] w-[120px] md:h-[150px]  md:w-[150px]  flex justify-center items-center rounded-lg   bg-gradient-to-r from-violet-800 to-purple-600">
            <div className="h-[100px] md:h-[110px] w-[100px] md:w-[110px] flex justify-center items-center  bg-white rounded-2xl">
              <div className="h-[100px] w-[100px] ">
                <img src={redux} className="h-full w-full " />
              </div>
            </div>
          </div>

          <div className="h-[120px]  w-[120px] md:h-[150px] md:w-[150px] flex justify-center items-center rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-900">
            <div className="h-[110px] w-[110px] md:h-[110px]  md:w-[110px] flex justify-center items-center  bg-white rounded-2xl">
              <div className="h-[100px] w-[100px] ">
                <img src={next} className="h-full w-full " />
              </div>
            </div>
          </div>

          <div className="h-[120px] w-[120px] md:h-[150px]  md:w-[150px]  flex justify-center items-center rounded-lg  bg-gradient-to-r from-cyan-400 to-cyan-400">
            <div className="h-[100px] w-[100px] md:h-[110px]  md:w-[110px] flex justify-center items-center  bg-white rounded-2xl">
              <div className="h-[90px] w-[90px] md:h-[100px] md:w-[100px] ">
                <img src={tailwind} className="h-full w-full object-contain" />
              </div>
            </div>
          </div>

          <div className="h-[120px] w-[120px] md:h-[150px]  md:w-[150px] flex justify-center items-center rounded-lg bg-gradient-to-r from-zinc-900 to-stone-900 ">
            <div className="h-[120px] md:h-[140px] w-[120px] md:w-[140px]">
              <img src={github} className="h-full w-full" />
            </div>
          </div>

          {/* END HERE */}
        </div>
        {/* TECH STACK BOX ENDS HERE */}
      </div>
    </div>
  );
};

export default Skills;
