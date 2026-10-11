import React from "react";
import { motion } from "framer-motion";

import hero2 from "../images/hero2.webp";
import SmartLink from "./SmartLink";
import { useSiteContent } from "../context/ContentContext";
import { Bone, LoadingLabel, SkeletonText } from "./Skeleton";
import { Float } from "./Motion";

// Hero copy rises in line by line on load.
const enter = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const Home = ({ onClickScroll }) => {
  const { content, loading } = useSiteContent();
  const { hero } = content;

  return (
    <div>
      <div className="relative h-full lg:h-[calc(100vh-3.5rem)] flex flex-col md:flex-row md:justify-between bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-2">
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
                <motion.h1
                  {...enter(0.1)}
                  className="text-[1.8rem] sm:text-[2.2rem] md:text-[2rem] lg:text-[3.4rem] text-center md:text-left md:leading-[2.8rem] lg:leading-[3.5rem] font-bold px-5 mt-2 md:mt-0 font-roboto "
                >
                  {hero.headline}
                </motion.h1>
              )}
            </div>

            <div className="mt-5 md:mt-10 w-full block lg:hidden text-center">
              {loading ? (
                <SkeletonText lines={3} lineClassName="h-3" className="px-8 md:px-4 items-center" />
              ) : (
                <motion.p
                  {...enter(0.25)}
                  className="px-8 md:px-4 lg:px-8 text-center text-[14px] leading-[16px] font-opensans"
                >
                  {hero.intro}
                </motion.p>
              )}
            </div>
            <motion.div
              {...enter(0.35)}
              className="flex gap-6 justify-center md:justify-start md:px-5 mt-5"
            >
              {loading && <Bone className="h-[2.1rem] lg:h-[2.4rem] w-[8.5rem] !rounded-lg" />}
              {!loading && hero.ctaUrl && (
                <SmartLink
                  to={hero.ctaUrl}
                  className="border px-4 flex items-center text-[16px]  md:text-[14px]  lg:text-[20px]  font-semibold rounded-lg bg-white/[0.06] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] font-roboto transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] active:scale-95"
                >
                  {hero.ctaLabel || "Get in touch"}
                </SmartLink>
              )}

              <button
                type="button"
                className="border px-4  text-[16px] md:text-[20px]  lg:text-[22px]  font-semibold rounded-xl  bg-[#32CD32]  flex items-center font-roboto transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#32CD32]/40 active:scale-95"
                onClick={onClickScroll}
              >
                <span className="drop-shadow-md">Explore</span>
              </button>
            </motion.div>
            <div className="md:mt-10 w-full hidden lg:block md:px-5">
              {loading ? (
                <SkeletonText lines={4} lineClassName="h-4" className="md:mt-6 w-10/12" />
              ) : (
                <motion.p
                  {...enter(0.5)}
                  className="md:mt-6 w-10/12 text-center md:text-left text-[16px] md:text-[16px] md:leading-[18px] xl:text-[18px] xl:leading-[20px]  font-robotomono"
                >
                  {hero.intro}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:h-full md:w-[50%] flex justify-center"
        >
          {/* Soft glow picked from the illustration's own purple. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[18%] rounded-full bg-purple-600/25 blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
          />
          <Float className="relative h-full flex justify-center">
            <img
              src={hero2}
              alt="Illustration of a developer working on a laptop under a starry sky"
              className="h-full object-contain"
            />
          </Float>
        </motion.div>

        {/* Scroll hint: a little mouse whose wheel rolls down. */}
        {onClickScroll && (
          <motion.button
            type="button"
            aria-label="Scroll to About"
            onClick={onClickScroll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="hidden lg:flex absolute bottom-6 left-1/2 -ml-[13px] h-10 w-[26px] justify-center rounded-full border-2 border-white/40 pt-2 transition-colors hover:border-white/80"
          >
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block h-2 w-1 rounded-full bg-white/80"
            />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Home;
