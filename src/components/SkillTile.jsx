import React from "react";
import SafeImg from "./SafeImg";

const Initial = ({ name, className }) => (
  <div className={`${className} flex items-center justify-center text-4xl font-bold font-bricolage text-slate-700`}>
    {(name || "?").charAt(0)}
  </div>
);

// Phones: a 3-column grid of fluid tiles. From `sm` up: the original
// wrapping row of fixed 120px / 150px tiles. Tiles size themselves in % below
// `sm`, so they must sit inside this layout (or a fixed-width wrapper).
export const skillGridClass =
  "grid grid-cols-3 gap-3 w-full max-w-[420px] px-4 sm:flex sm:flex-wrap sm:max-w-none sm:w-auto sm:gap-6 md:gap-8 sm:justify-center md:justify-start sm:items-center md:w-[90%] md:px-0";

const SkillTile = ({ skill }) => {
  const background = {
    backgroundImage: `linear-gradient(to right, ${skill.bgFrom}, ${skill.bgTo || skill.bgFrom})`,
  };
  const imagePadding = { padding: `${Math.min(Math.max(skill.padding || 0, 0), 40)}%` };

  return (
    <div
      title={skill.name}
      className="aspect-square w-full sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] flex justify-center items-center rounded-lg shrink-0 transition-transform duration-300 hover:-translate-y-1"
      style={background}
    >
      {skill.variant === "framed" ? (
        <div className="h-[83%] w-[83%] sm:h-[100px] sm:w-[100px] md:h-[110px] md:w-[110px] flex justify-center items-center bg-white rounded-2xl">
          <SafeImg
            src={skill.image}
            alt={skill.name}
            className="h-[90%] w-[90%] sm:h-[90px] sm:w-[90px] md:h-[100px] md:w-[100px] object-contain"
            style={imagePadding}
            fallback={<Initial name={skill.name} className="h-[90%] w-[90%]" />}
          />
        </div>
      ) : (
        <SafeImg
          src={skill.image}
          alt={skill.name}
          className="h-[97%] w-[97%] sm:h-[116px] sm:w-[116px] md:h-[140px] md:w-[140px] object-contain"
          style={imagePadding}
          fallback={<Initial name={skill.name} className="h-[83%] w-[83%] bg-white rounded-2xl" />}
        />
      )}
    </div>
  );
};

export default SkillTile;
