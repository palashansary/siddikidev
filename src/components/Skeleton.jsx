import React from "react";

// Placeholder shapes shown while content loads. Sized like the real
// elements so nothing jumps when content arrives. The pulse is skipped for
// people who prefer reduced motion.
export const Bone = ({ className = "" }) => (
  <div aria-hidden="true" className={`motion-safe:animate-pulse rounded-md bg-slate-700/40 ${className}`} />
);

// A paragraph of bars; the last one is shorter, like real text.
export const SkeletonText = ({ lines = 3, lineClassName = "h-4", gapClassName = "gap-2", className = "" }) => (
  <div aria-hidden="true" className={`flex flex-col ${gapClassName} ${className}`}>
    {Array.from({ length: lines }, (_, index) => (
      <Bone key={index} className={`${lineClassName} ${index === lines - 1 ? "w-2/3" : "w-full"}`} />
    ))}
  </div>
);

// Same footprint as <Card />.
export const ProjectCardSkeleton = () => (
  <div aria-hidden="true" className="w-full pb-5 sm:pb-0 sm:h-[350px] sm:w-[440px] bg-gradient-to-r from-slate-700/60 to-slate-800/60 rounded-3xl">
    <div className="h-full w-full flex flex-col items-center">
      <Bone className="aspect-[16/10] sm:aspect-auto sm:h-[60%] w-[90%] mt-4 !rounded-2xl" />
      <div className="flex w-[90%] flex-col gap-2 mt-3">
        <div className="flex justify-between items-center">
          <Bone className="h-6 w-1/2" />
          <Bone className="h-8 w-16" />
        </div>
        <SkeletonText lines={2} lineClassName="h-3 md:h-4" />
      </div>
    </div>
  </div>
);

// Same footprint as <SkillTile />.
export const SkillTileSkeleton = () => (
  <Bone className="aspect-square w-full sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] !rounded-lg" />
);

// Screen-reader announcement for a loading region.
export const LoadingLabel = ({ children = "Loading…" }) => <span className="sr-only">{children}</span>;
