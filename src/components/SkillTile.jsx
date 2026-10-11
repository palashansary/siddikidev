import React from "react";
import SafeImg from "./SafeImg";

const Initial = ({ name, className }) => (
  <div className={`${className} flex items-center justify-center text-4xl font-bold font-bricolage text-slate-700`}>
    {(name || "?").charAt(0)}
  </div>
);

const SkillTile = ({ skill }) => {
  const background = {
    backgroundImage: `linear-gradient(to right, ${skill.bgFrom}, ${skill.bgTo || skill.bgFrom})`,
  };
  const imagePadding = { padding: `${Math.min(Math.max(skill.padding || 0, 0), 40)}%` };

  return (
    <div
      title={skill.name}
      className="h-[120px] w-[120px] md:h-[150px] md:w-[150px] flex justify-center items-center rounded-lg shrink-0 transition-transform duration-300 hover:-translate-y-1"
      style={background}
    >
      {skill.variant === "framed" ? (
        <div className="h-[100px] w-[100px] md:h-[110px] md:w-[110px] flex justify-center items-center bg-white rounded-2xl">
          <SafeImg
            src={skill.image}
            alt={skill.name}
            className="h-[90px] w-[90px] md:h-[100px] md:w-[100px] object-contain"
            style={imagePadding}
            fallback={<Initial name={skill.name} className="h-[90px] w-[90px]" />}
          />
        </div>
      ) : (
        <SafeImg
          src={skill.image}
          alt={skill.name}
          className="h-[116px] w-[116px] md:h-[140px] md:w-[140px] object-contain"
          style={imagePadding}
          fallback={<Initial name={skill.name} className="h-[100px] w-[100px] bg-white rounded-2xl" />}
        />
      )}
    </div>
  );
};

export default SkillTile;
