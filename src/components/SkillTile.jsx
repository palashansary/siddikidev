import React, { useRef } from "react";
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
  "grid grid-cols-3 gap-3 w-full max-w-[520px] px-5 sm:px-8 sm:flex sm:flex-wrap sm:max-w-none sm:w-auto sm:gap-6 md:gap-8 sm:justify-center md:justify-start sm:items-center md:w-[90%] md:px-0";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const SkillTile = ({ skill }) => {
  const tileRef = useRef(null);

  // Tilt toward the mouse for a 3D feel. Written straight to the style so
  // moving the mouse doesn't re-render.
  const tilt = (event) => {
    const tile = tileRef.current;
    if (!tile || event.pointerType !== "mouse" || reducedMotion()) return;
    const box = tile.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    tile.style.transform = `perspective(600px) rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg) translateY(-4px)`;
  };
  const resetTilt = () => {
    if (tileRef.current) tileRef.current.style.transform = "";
  };

  const background = {
    backgroundImage: `linear-gradient(to right, ${skill.bgFrom}, ${skill.bgTo || skill.bgFrom})`,
  };
  const imagePadding = { padding: `${Math.min(Math.max(skill.padding || 0, 0), 40)}%` };

  return (
    <div
      ref={tileRef}
      title={skill.name}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
      className="aspect-square w-full sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] flex justify-center items-center rounded-lg shrink-0 transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:shadow-[0_18px_36px_-14px_rgba(0,0,0,0.7)]"
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
