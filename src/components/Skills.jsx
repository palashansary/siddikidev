import React from "react";

import SkillTile, { skillGridClass } from "./SkillTile";
import { useSiteContent } from "../context/ContentContext";
import { Bone, LoadingLabel, SkillTileSkeleton } from "./Skeleton";
import { Reveal, StaggerGroup, StaggerItem } from "./Motion";

const Skills = () => {
  const { content, loading } = useSiteContent();
  const { skills } = content;

  if (!loading && skills.length === 0) return null;

  return (
    <section>
      <div className="h-full  py-8 md:pt-4 md:pb-10 flex flex-col justify-center md:justify-start md:mt-8 items-center">
        <Reveal className="md:w-[90%] text-start ">
          <h2 className=" text-[2rem] md:text-[2.2rem] font-bold mb-8 font-bricolage text-blue-500">
            My Tech Stacks
          </h2>
        </Reveal>

        {loading ? (
          <div className={skillGridClass} aria-busy="true">
            <LoadingLabel>Loading skills…</LoadingLabel>
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="flex flex-col items-center">
                <SkillTileSkeleton />
                <Bone className="mt-2 h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerGroup as="ul" stagger={0.04} className={skillGridClass}>
            {skills.map((skill) => (
              <StaggerItem as="li" key={skill.id} className="flex flex-col items-center">
                <SkillTile skill={skill} />
                <span className="mt-2 w-full truncate text-center text-[11px] sm:text-[13px] md:text-sm text-slate-400 font-bricolage">
                  {skill.name}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
};

export default Skills;
