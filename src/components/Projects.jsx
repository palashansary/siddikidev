import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useSiteContent } from "../context/ContentContext";
import { LoadingLabel, ProjectCardSkeleton, SkeletonText } from "./Skeleton";

const Projects = ({ onHomePage }) => {
  const { content, loading } = useSiteContent();
  const projects = onHomePage
    ? content.projects.filter((project) => project.showOnHome)
    : content.projects;

  const cards = projects.map((project) => (
    <Card
      key={project.id}
      name={project.name}
      image={project.image}
      description={project.description}
      link={project.link}
    />
  ));

  return (
    <section className="h-full py-12 md:py-14 flex flex-col items-center justify-center z-0  overflow-hidden">
      <div className="mb-8 md:mb-10  flex flex-col items-center md:items-start md:w-[90%]">
        <h2 className="text-[1.6rem] md:text-[2.2rem] text-blue-400 font-bold font-bricolage  flex items-start">
          My Recent Projects
        </h2>
        <div className="flex flex-col md:flex-row  justify-center md:justify-between items-center">
          {loading ? (
            <SkeletonText lines={2} lineClassName="h-3 md:h-4" className="mt-3 w-[80vw] md:w-[50vw] max-w-[44rem]" />
          ) : (
            <p className="mt-3  text-slate-100 w-4/5 md:w-3/5  text-[14px] leading-[16px] md:text-[18px] md:leading-[20px] font-bricolage">
              {content.projectsSection.intro}
            </p>
          )}

          {onHomePage && (
            <Link
              to="/projects"
              className="text-white h-full w-[120px] px-3 py-1 bg-blue-950 mt-4 rounded-md flex justify-between items-center"
            >
              <span> see more</span>
              <FaLongArrowAltRight />
            </Link>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex gap-8 flex-wrap justify-center" aria-busy="true">
          <LoadingLabel>Loading projects…</LoadingLabel>
          <ProjectCardSkeleton />
          <div className="hidden sm:contents">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <p className="text-slate-400 font-bricolage">New projects are on the way.</p>
      )}

      {!loading && onHomePage && projects.length > 0 && (
        <div className="mt-5 w-full max-w-[340px] sm:hidden">
          <Carousel
            // Remount when the list changes (e.g. static → live content).
            key={projects.map((project) => project.id).join()}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            centerMode={true}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            interval={2000}
            centerSlidePercentage={100}
          >
            {cards}
          </Carousel>
        </div>
      )}

      {!loading && (
        <div
          className={`${onHomePage ? "hidden sm:flex" : "flex"} gap-8 flex-wrap justify-center`}
        >
          {cards}
        </div>
      )}
    </section>
  );
};

export default Projects;
