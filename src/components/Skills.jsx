import React from "react";

import SkillTile, { skillGridClass } from "./SkillTile";
import { useSiteContent } from "../context/ContentContext";
import { LoadingLabel, SkillTileSkeleton } from "./Skeleton";
import { Reveal, StaggerGroup, StaggerItem } from "./Motion";

const Skills = () => {
  const { content, loading } = useSiteContent();
  const { skills } = content;

  if (!loading && skills.length === 0) return null;

  return (
    <section>
      <div className="h-full  py-8 md:pt-4 md:pb-10 flex flex-col justify-center md:justify-start md:mt-8 items-center">
        <Reveal className="md:w-[90%] text-start ">
          <h2 className="heading-gradient text-[1.75rem] md:text-[2.2rem] font-bold mb-6 md:mb-8 font-bricolage">
            My Tech Stacks
          </h2>
        </Reveal>

        {loading ? (
          <div className={skillGridClass} aria-busy="true">
            <LoadingLabel>Loading skills…</LoadingLabel>
            {Array.from({ length: 8 }, (_, index) => (
              <SkillTileSkeleton key={index} />
            ))}
          </div>
        ) : (
          <StaggerGroup as="ul" stagger={0.04} className={skillGridClass}>
            {skills.map((skill) => (
              <StaggerItem as="li" key={skill.id}>
                <SkillTile skill={skill} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
};

export default Skills;
