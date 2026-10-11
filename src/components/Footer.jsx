import React from "react";

import newogo from "../images/newlogo.webp";
import SafeImg from "./SafeImg";
import SmartLink from "./SmartLink";
import { useSiteContent } from "../context/ContentContext";
import { Bone } from "./Skeleton";
import { Reveal } from "./Motion";
import BackToTop from "./BackToTop";

const Footer = () => {
  const { content, loading } = useSiteContent();
  const { footer, socials, profile } = content;

  return (
    <footer>
      <div className="divider-fade" aria-hidden="true" />
      <div className=" h-full md:h-[160px] bg-[#0A1926]/40 backdrop-blur-md ">
        <Reveal y={16} className="text-left pt-6 pb-4 px-5 sm:px-8 md:px-16 h-full flex flex-col   md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col ">
            <div className="h-[35px] md:h-[50px]">
              <img src={newogo} alt="AHSA logo" width={610} height={207} loading="lazy" className="h-full w-auto" />
            </div>
            <div>
              {loading ? (
                <Bone className="mt-3 h-4 md:h-5 w-56 md:w-[28rem] max-w-[80vw]" />
              ) : (
                <p className="text-slate-200 text-[0.8rem] md:text-[1.2rem] font-semibold  mt-2 w-4/6 lg:w-full ">
                  {footer.tagline}
                </p>
              )}
            </div>
          </div>
          {loading && (
            <div className="flex flex-col items-start mt-4 md:mt-0">
              <Bone className="h-5 w-36" />
              <div className="mt-3 flex gap-1">
                {[0, 1, 2].map((index) => (
                  <Bone key={index} className="h-[45px] w-[45px] md:h-[60px] md:w-[60px] !rounded-xl" />
                ))}
              </div>
            </div>
          )}
          {!loading && socials.length > 0 && (
            <div className="flex flex-col items-start mt-4 md:mt-0">
              <div className="pl-1">
                <p className="text-slate-100 text-[1.1rem] font-semibold font-opensans">
                  Connect with me
                </p>
              </div>
              <ul className="mt-3 flex gap-1">
                {socials.map((social) => (
                  <li key={social.id} className="h-[45px] md:h-[60px]">
                    <SmartLink
                      to={social.url}
                      aria-label={social.name}
                      title={social.name}
                      className="block h-full transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                    >
                      <SafeImg
                        src={social.icon}
                        alt=""
                        width={450}
                        height={450}
                        className="h-full w-auto"
                        fallback={
                          <span className="h-full px-3 flex items-center rounded-lg bg-slate-800 text-white text-sm font-semibold">
                            {social.name}
                          </span>
                        }
                      />
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </div>
      <div className="border-t border-white/[0.05] bg-black/[0.15] px-5 sm:px-8 md:px-16 py-4 text-[12px] md:text-[13px] text-slate-400 font-opensans">
        © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS & Firebase.
      </div>
      <BackToTop />
    </footer>
  );
};

export default Footer;
