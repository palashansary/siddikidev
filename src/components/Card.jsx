import React from "react";

import live from "../images/3d/live.webp";

import { Link } from "react-router-dom";

const Card = ({ image, name, description, link }) => {
  return (
    <div>
      <div className="h-[300px] w-[340px]   sm:h-[350px] sm:w-[440px] bg-gradient-to-r from-slate-700 to-slate-800 rounded-3xl z-0">
        <div className="h-full w-full flex flex-col items-center   rounded-3xl">
          <div className="h-[60%] w-[90%] mt-4 rounded-2xl relative">
            <img src={image} className="h-full w-full rounded-2xl" />
          </div>
          <div className="flex w-[90%] flex-col justify-start  mt-2 md:mt-3">
            <div className="flex justify-between">
              <p className="text-white text-[1.3rem]  font-bold">{name}</p>

              <Link to={link}>
                <img
                  src={live}
                  className="h-[32px] md:h-[36px]    cursor-pointer "
                />
              </Link>
            </div>

            <p className="text-slate-300 text-[13px] leading-[15px] md:text-[16px] md:leading-[18px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
