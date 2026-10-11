import React from "react";

import SkillTile, { skillGridClass } from "./SkillTile";
import { useSiteContent } from "../context/ContentContext";
import { LoadingLabel, SkillTileSkeleton } from "./Skeleton";

const Skills = () => {
  const { content, loading } = useSiteContent();
  const { skills } = content;

  if (!loading && skills.length === 0) return null;

  return (
    <section>
      <div className="h-full  py-8 md:pt-4 md:pb-10 flex flex-col justify-center md:justify-start md:mt-8 items-center">
        <div className="md:w-[90%] text-start ">
          <h2 className=" text-[2rem] md:text-[2.2rem] font-bold mb-8 font-bricolage text-blue-500">
            My Tech Stacks
          </h2>
        </div>

        {loading ? (
          <div className={skillGridClass} aria-busy="true">
            <LoadingLabel>Loading skills…</LoadingLabel>
            {Array.from({ length: 8 }, (_, index) => (
              <SkillTileSkeleton key={index} />
            ))}
          </div>
        ) : (
          <ul className={skillGridClass}>
            {skills.map((skill) => (
              <li key={skill.id}>
                <SkillTile skill={skill} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Skills;
