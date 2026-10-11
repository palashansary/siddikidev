import React, { useState } from "react";

import developer from "../images/developer.webp";
import { useSiteContent } from "../context/ContentContext";
import { Bone, LoadingLabel, SkeletonText } from "./Skeleton";

const About = React.forwardRef((props, ref) => {
  const { content, loading } = useSiteContent();
  const { about } = content;
  const [isVisibleAbout, setIsVisibleAbout] = useState(false);

  return (
    <section ref={ref} id="about" className="scroll-mt-14">
      <div className="border-t border-blue-900 pt-10 md:pt-12">
        <div className="text-center mt-4 flex justify-center">
          <h2 className=" text-[1.8rem] md:text-[2.2rem] font-bold font-spectral text-white border-b-[2px] lg:border-b-[3px] border-emerald-500 rounded-sm">
            About <span className="text-green-500">Me</span>
          </h2>
        </div>
        <div className="py-2 md:py-8 flex flex-col lg:flex-row justify-center ">
          <div className="flex justify-center  ">
            <div className="w-[360px] sm:w-[400px] md:w-[500px] max-w-[calc(100vw_-_2rem)]">
              <img
                src={developer}
                alt="3D illustration of a developer coding on a laptop"
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="flex justify-center items-start">
            <div className="flex flex-col items-center md:mt-16">
              {loading ? (
                <div className="w-[80vw] lg:w-[40vw] max-w-[44rem]" aria-busy="true">
                  <LoadingLabel />
                  <Bone className="h-7 md:h-9 w-40 mb-3" />
                  <SkeletonText lines={7} lineClassName="h-4 md:h-5" gapClassName="gap-3" />
                </div>
              ) : (
                <div className="w-4/5 text-white text-[15px] sm:text-[18px] md:text-[20px] font-bricolage">
                  <p className="text-green-500 text-[24px] md:text-[32px] font-bold">
                    {about.greeting}
                  </p>
                  {/* Mobile shows a clamped preview with "see more"; md+ shows it all. */}
                  <p
                    className={`whitespace-pre-line ${
                      isVisibleAbout ? "" : "max-md:line-clamp-5"
                    }`}
                  >
                    {about.body}
                  </p>
                  <button
                    type="button"
                    className="text-blue-400 text-[16px] md:hidden"
                    aria-expanded={isVisibleAbout}
                    onClick={() => setIsVisibleAbout((visible) => !visible)}
                  >
                    {isVisibleAbout ? "see less" : "see more"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
