import React from "react";

import { useSiteContent } from "../context/ContentContext";
import { Reveal } from "./Motion";
import { Bone, LoadingLabel, SkeletonText } from "./Skeleton";

const toLines = (text) =>
  (text || "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);

const toTags = (text) =>
  (text || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

// "Dokume India Pvt Ltd" → "DI", "Fple Technology Pvt Ltd" → "FT"
const monogram = (company) =>
  (company || "?")
    .replace(/\b(pvt|private|ltd|limited|inc|llc)\b\.?/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || company.charAt(0).toUpperCase();

const isCurrent = (period) => /present|current|now/i.test(period || "");

// Slowly drifting colour behind the cards, so the glass has something to
// refract. CSS-only; it holds still on phones (moving light under blurred
// glass is costly on mobile GPUs) and for reduced-motion visitors.
const AmbientLight = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute left-[4%] top-[18%] h-72 w-72 md:h-96 md:w-96 rounded-full bg-blue-600/20 blur-[110px] md:motion-safe:animate-drift" />
    <div className="absolute right-[8%] bottom-[8%] h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full bg-purple-600/15 blur-[120px] md:motion-safe:animate-drift-reverse" />
  </div>
);

// Dot sits level with the job title (card padding + half a title line).
const dotPosition = "top-[1.85rem] md:top-[2.45rem]";

const ExperienceSkeleton = () => (
  <li className="relative pl-7 md:pl-10 pb-8" aria-hidden="true">
    <span className={`absolute -left-[7px] ${dotPosition} h-3.5 w-3.5 rounded-full bg-slate-700`} />
    <div className="glass rounded-3xl p-5 md:p-7">
      <Bone className="h-6 w-56 max-w-full" />
      <Bone className="mt-2 h-4 w-40" />
      <SkeletonText lines={3} className="mt-5" />
    </div>
  </li>
);

const Experience = () => {
  const { content, loading } = useSiteContent();
  const { experience } = content;

  if (!loading && experience.length === 0) return null;

  return (
    <section className="relative isolate py-8 md:py-14 flex flex-col items-center">
      <AmbientLight />

      <Reveal className="w-full px-5 sm:px-8 md:px-0 md:w-[90%] mb-6 md:mb-10 flex justify-center md:justify-start">
        <h2 className="heading-gradient text-[1.75rem] md:text-[2.2rem] font-bold font-bricolage">
          My Experience
        </h2>
      </Reveal>

      {/* Same left edge as the heading; capped width keeps lines readable. */}
      <div className="w-full px-5 sm:px-8 md:px-0 md:w-[90%]">
        <div className="relative max-w-5xl md:ml-2">
          {/* Timeline line: green at the newest role, fading out at the end. */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-green-500/70 via-blue-700/60 to-transparent"
          />
          {loading && <LoadingLabel>Loading experience…</LoadingLabel>}
          <ol className="relative">
            {loading && (
              <>
                <ExperienceSkeleton />
                <ExperienceSkeleton />
              </>
            )}

            {!loading &&
              experience.map((job, index) => {
                const current = isCurrent(job.period);
                const lines = toLines(job.highlights);
                const tags = toTags(job.tech);
                return (
                  <Reveal
                    as="li"
                    key={job.id}
                    delay={index * 0.08}
                    className="relative pl-7 md:pl-10 pb-8 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[7px] ${dotPosition} h-4 w-4 rounded-full ring-4 ring-[#0A1926] ${
                        current ? "bg-green-500" : "bg-blue-500"
                      }`}
                    />

                    <article className="glass rounded-3xl p-5 md:p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex items-start gap-3 md:gap-4">
                          <span
                            aria-hidden="true"
                            className="glass-pill hidden sm:flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl text-[15px] md:text-[17px] font-bold text-blue-200 font-bricolage"
                          >
                            {monogram(job.company)}
                          </span>
                          <div>
                            <h3 className="text-white text-[1.2rem] md:text-[1.45rem] font-bold font-bricolage leading-tight">
                              {job.role}
                            </h3>
                            <p className="mt-1 text-blue-300 font-semibold text-[15px] md:text-[17px]">
                              {job.company}
                            </p>
                          </div>
                        </div>
                        {job.period && (
                          <span className="glass-pill w-fit shrink-0 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] md:text-sm text-blue-100 font-robotomono">
                            {current && (
                              <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                              </span>
                            )}
                            {job.period}
                          </span>
                        )}
                      </div>

                      {lines.length > 0 && (
                        <ul className="mt-5 space-y-2.5 text-slate-300 text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]">
                          {lines.map((line) => (
                            <li key={line} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500/90"
                              />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                          {tags.map((tag) => (
                            <li
                              key={tag}
                              className="glass-pill rounded-full px-2.5 py-0.5 text-[12px] md:text-[13px] text-blue-200"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Reveal>
                );
              })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
