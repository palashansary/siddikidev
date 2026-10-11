import React from "react";

import live from "../images/3d/live.webp";
import SafeImg from "./SafeImg";

const ImagePlaceholder = ({ name }) => (
  <div className="h-full w-full rounded-2xl bg-slate-600/60 flex items-center justify-center text-slate-300 text-xl font-bold font-bricolage">
    {name}
  </div>
);

const Card = ({ image, name, description, link }) => {
  return (
    <div>
      <div className="h-[300px] w-[340px] max-w-[calc(100vw_-_2rem)] sm:h-[350px] sm:w-[440px] bg-gradient-to-r from-slate-700 to-slate-800 rounded-3xl z-0">
        <div className="h-full w-full flex flex-col items-center   rounded-3xl">
          <div className="h-[60%] w-[90%] mt-4 rounded-2xl relative">
            <SafeImg
              src={image}
              alt={`${name} screenshot`}
              className="h-full w-full rounded-2xl object-cover object-top"
              fallback={<ImagePlaceholder name={name} />}
            />
          </div>
          <div className="flex w-[90%] flex-col justify-start  mt-2 md:mt-3">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-white text-[1.3rem] font-bold truncate">{name}</h3>

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${name} live demo`}
                  className="shrink-0"
                >
                  <img
                    src={live}
                    alt=""
                    className="h-[32px] md:h-[36px] !w-auto cursor-pointer"
                  />
                </a>
              )}
            </div>

            <p className="text-slate-300 text-[13px] leading-[15px] md:text-[16px] md:leading-[18px] line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
