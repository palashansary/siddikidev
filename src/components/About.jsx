import React, { useState } from "react";

import developer from "../images/developer.webp";
const About = React.forwardRef((props, ref) => {
  const [isVisibleAbout, setIsVisibleAbout] = useState(false);

  const toggleVisibility = () => {
    setIsVisibleAbout(!isVisibleAbout);
  };
  return (
    <div ref={ref}>
      <div className="border-t border-blue-900 pt-10 md:pt-12">
        <div className="text-center mt-4 flex justify-center">
          <p className=" text-[1.8rem] md:text-[2.2rem] font-bold font-spectral text-white border-b-[2px] lg:border-b-[3px] border-emerald-500 rounded-sm">
            About <span className="text-green-500">Me</span>
          </p>
        </div>
        <div className="py-2 md:py-8 flex flex-col lg:flex-row justify-center ">
          <div className="flex justify-center  ">
            <div className="w-[360px] sm:w-[400px] md:w-[500px] ">
              <img src={developer} className="h-full w-full" />
            </div>
          </div>
          <div className="flex justify-center items-start">
            <div className="hidden md:block">
              <div className="flex justify-center mt-4 md:mt-16">
                <p className="text-white w-4/5 text-[15px] sm:text-[18px] md:text-[20px]  font-bricolage">
                  <span className="text-green-500 text-[24px] md:text-[32px] font-bold">
                    Greetings!
                  </span>{" "}
                  <br />
                  I'm Abdul Hai Siddiki Ansary, a Computer Science graduate from
                  the University of Kalyani, driven by the passion to excel as a
                  Frontend Developer. My journey in code began with an ardent
                  fascination for crafting visually appealing and user-friendly
                  web interfaces. With an unwavering commitment to learning, I'm
                  eager to dive into the professional realm, utilizing my solid
                  foundation in frontend technologies to bring creative designs
                  to life. Equipped with an eye for detail and a dedication to
                  clean coding practices, I'm excited to contribute my skills
                  and collaborate with like-minded professionals to deliver
                  engaging and exceptional digital experiences. Let's embark on
                  this exciting journey together, turning ideas into captivating
                  realities!
                </p>
              </div>
            </div>
            {/* MOBILE ABOUT START */}
            <div className=" md:hidden">
              <div className="flex justify-center ">
                <p className="text-white w-4/5 text-[15px] sm:text-[18px] md:text-[20px]  font-bricolage">
                  <span className="text-green-500 text-[24px] md:text-[32px] font-bold">
                    Greetings!
                  </span>{" "}
                  <br />
                  I'm Abdul Hai Siddiki Ansary, a Computer Science graduate from
                  the University of Kalyani, driven by the passion to excel as a
                  Frontend Developer. My journey in code began with an ardent
                  fascination for crafting visually appealing and user-friendly
                  web interfaces.
                  <span className={isVisibleAbout ? "block" : "hidden"}>
                    With an unwavering commitment to learning, I'm eager to dive
                    into the professional realm, utilizing my solid foundation
                    in frontend technologies to bring creative designs to life.
                    Equipped with an eye for detail and a dedication to clean
                    coding practices, I'm excited to contribute my skills and
                    collaborate with like-minded professionals to deliver
                    engaging and exceptional digital experiences. Let's embark
                    on this exciting journey together, turning ideas into
                    captivating realities!
                  </span>
                  <button
                    className="text-blue-400 ml-2 text-[16px]"
                    onClick={toggleVisibility}
                  >
                    {isVisibleAbout ? "see less" : "see more"}
                  </button>
                </p>
              </div>
            </div>
            {/* MOBILE ABOUT END */}
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;
