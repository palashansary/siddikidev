import React from "react";

import hero2 from "../images/hero2.webp";
import SmartLink from "./SmartLink";
import { useSiteContent } from "../context/ContentContext";
import { Bone, LoadingLabel, SkeletonText } from "./Skeleton";

const Home = ({ onClickScroll }) => {
  const { content, loading } = useSiteContent();
  const { hero } = content;

  return (
    <div>
      <div className="h-full lg:h-[calc(100vh-3.5rem)] flex flex-col md:flex-row md:justify-between bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-2">
        <div className="text-3xl text-white flex justify-center items-center md:pl-12 lg:pl-16 py-4  md:py-6  md:h-full md:w-[60vw] mt-2 md:mt-0">
          <div>
            <div>
              {loading ? (
                // As wide as the real text column so nothing shifts on load.
                <div className="px-5 mt-2 md:mt-0 w-[85vw] md:w-[52vw] lg:w-[54vw] mx-auto md:mx-0">
                  <LoadingLabel />
                  <SkeletonText
                    lines={3}
                    gapClassName="gap-3"
                    lineClassName="h-[1.8rem] sm:h-[2.2rem] md:h-[2rem] lg:h-[3rem]"
                    className="md:max-w-[36rem]"
                  />
                </div>
              ) : (
                <h1 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2rem] lg:text-[3.4rem] text-center md:text-left md:leading-[2.8rem] lg:leading-[3.5rem] font-bold px-5 mt-2 md:mt-0 font-roboto ">
                  {hero.headline}
                </h1>
              )}
            </div>

            <div className="mt-5 md:mt-10 w-full block lg:hidden text-center">
              {loading ? (
                <SkeletonText lines={3} lineClassName="h-3" className="px-8 md:px-4 items-center" />
              ) : (
                <p className="px-8 md:px-4 lg:px-8 text-center text-[14px] leading-[16px] font-opensans">
                  {hero.intro}
                </p>
              )}
            </div>
            <div className="flex gap-6 justify-center md:justify-start md:px-5 mt-5">
              {loading && <Bone className="h-[2.1rem] lg:h-[2.4rem] w-[8.5rem] !rounded-lg" />}
              {!loading && hero.ctaUrl && (
                <SmartLink
                  to={hero.ctaUrl}
                  className="border px-4 flex items-center text-[16px]  md:text-[14px]  lg:text-[20px]  font-semibold rounded-lg bg-slate-950 font-roboto"
                >
                  {hero.ctaLabel || "Get in touch"}
                </SmartLink>
              )}

              <button
                type="button"
                className="border px-4  text-[16px] md:text-[20px]  lg:text-[22px]  font-semibold rounded-xl  bg-[#32CD32]  flex items-center font-roboto"
                onClick={onClickScroll}
              >
                <span className="drop-shadow-md">Explore</span>
              </button>
            </div>
            <div className="md:mt-10 w-full hidden lg:block md:px-5">
              {loading ? (
                <SkeletonText lines={4} lineClassName="h-4" className="md:mt-6 w-10/12" />
              ) : (
                <p className="md:mt-6 w-10/12 text-center md:text-left text-[16px] md:text-[16px] md:leading-[18px] xl:text-[18px] xl:leading-[20px]  font-robotomono">
                  {hero.intro}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="md:h-full md:w-[50%] flex justify-center">
          <img
            src={hero2}
            alt="Illustration of a developer working on a laptop under a starry sky"
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
