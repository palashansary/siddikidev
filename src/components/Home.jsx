import React from "react";
import { m } from "framer-motion";

import SmartLink from "./SmartLink";
import { useSiteContent } from "../context/ContentContext";
import { Float } from "./Motion";

// Hero copy rises in line by line on load.
const enter = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const Home = ({ onClickScroll }) => {
  // No skeleton here on purpose: the hero is the first thing visitors (and
  // Google's LCP metric) see, so it renders straight away from the cached
  // or static copy and quietly updates if the database has newer text.
  const { hero } = useSiteContent().content;

  return (
    <div>
      {/* hero-screen: exactly one screen tall, so the next section doesn't peek in. */}
      <div className="hero-screen relative h-full lg:h-[calc(100vh-3.5rem)] flex flex-col md:flex-row md:justify-between bg-gradient-to-b from-gray-900 via-black to-[#0A1926] pt-2">
        <div className="text-3xl text-white flex justify-center items-center md:pl-12 lg:pl-16 py-4  md:py-6  md:h-full md:w-[60vw] mt-2 md:mt-0">
          <div>
            <div>
              <m.h1
                {...enter(0.05)}
                className="text-[1.8rem] sm:text-[2.2rem] md:text-[2rem] lg:text-[3.4rem] text-center md:text-left md:leading-[2.8rem] lg:leading-[3.5rem] font-bold px-5 mt-2 md:mt-0 font-roboto "
              >
                {hero.headline}
              </m.h1>
            </div>

            <div className="mt-5 md:mt-10 w-full block lg:hidden text-center">
              <m.p
                {...enter(0.12)}
                className="px-5 md:px-4 lg:px-8 text-center text-[14px] leading-[18px] font-opensans text-slate-200"
              >
                {hero.intro}
              </m.p>
            </div>
            <m.div
              {...enter(0.18)}
              className="flex gap-6 justify-center md:justify-start md:px-5 mt-5"
            >
              {hero.ctaUrl && (
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
            </m.div>
            <div className="md:mt-10 w-full hidden lg:block md:px-5">
              <m.p
                {...enter(0.24)}
                className="md:mt-6 w-10/12 text-center md:text-left text-[16px] md:text-[16px] md:leading-[18px] xl:text-[18px] xl:leading-[20px]  font-robotomono font-light text-slate-300"
              >
                {hero.intro}
              </m.p>
            </div>
          </div>
        </div>

        <m.div
          // Scale only, no fade: the hero image is the main (LCP) element and
          // shouldn't start invisible.
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1 min-h-[16rem] md:min-h-0 md:flex-none md:h-full md:w-[50%] flex md:items-center justify-center"
        >
          {/* Soft glow picked from the illustration's own purple. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[18%] rounded-full bg-purple-600/25 blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
          />
          <Float className="relative w-full md:w-auto md:h-full flex justify-center">
            {/* Preloaded from index.html (same srcset/sizes) so it downloads
                in parallel with the JavaScript. */}
            <img
              src="/images/hero.webp"
              srcSet="/images/hero-768.webp 768w, /images/hero.webp 1024w"
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Illustration of a developer working on a laptop under a starry sky"
              width={1024}
              height={930}
              decoding="async"
              // eslint-disable-next-line react/no-unknown-property -- valid HTML; React 18 passes it through
              fetchpriority="high"
              // Phones: fills the space under the buttons (object-cover keeps
              // the sphere centred). Fades at top/bottom so it blends in.
              className="hero-fade absolute inset-0 h-full w-full object-cover object-[50%_60%] md:static md:w-auto md:h-full md:object-contain"
            />
          </Float>
        </m.div>

        {/* Scroll hint: a little mouse whose wheel rolls down. */}
        {onClickScroll && (
          <m.button
            type="button"
            aria-label="Scroll to About"
            onClick={onClickScroll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex md:hidden lg:flex absolute bottom-4 lg:bottom-6 left-1/2 -ml-[13px] h-10 w-[26px] justify-center rounded-full border-2 border-white/40 pt-2 transition-colors hover:border-white/80"
          >
            <span className="block h-2 w-1 rounded-full bg-white/80 motion-safe:animate-wheel" />
          </m.button>
        )}
      </div>
    </div>
  );
};

export default Home;
