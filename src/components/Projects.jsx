import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useSiteContent } from "../context/ContentContext";
import { LoadingLabel, ProjectCardSkeleton, SkeletonText } from "./Skeleton";
import { Reveal, StaggerGroup, StaggerItem } from "./Motion";

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
    <section className="h-full py-8 md:py-14 flex flex-col items-center justify-center z-0  overflow-hidden">
      <Reveal className="w-full px-5 sm:px-8 md:px-0 mb-6 md:mb-10  flex flex-col items-center md:items-start md:w-[90%]">
        <h2 className="heading-gradient text-[1.75rem] md:text-[2.2rem] font-bold font-bricolage">
          My Recent Projects
        </h2>
        <div className="w-full flex flex-col md:flex-row  justify-center md:justify-between items-center">
          {loading ? (
            <SkeletonText lines={2} lineClassName="h-3 md:h-4" className="mt-3 w-full md:w-[50vw] max-w-[44rem]" />
          ) : (
            <p className="mt-3  text-slate-300 w-full md:w-3/5 text-center md:text-left text-[14px] leading-[20px] md:text-[18px] md:leading-[20px] font-bricolage">
              {content.projectsSection.intro}
            </p>
          )}

          {onHomePage && (
            <Link
              to="/projects"
              className="group glass-pill text-white h-full gap-3 px-3 py-1 !bg-blue-950/60 !border-blue-400/20 mt-4 rounded-md flex justify-between items-center transition-colors duration-300 hover:!bg-blue-900/70"
            >
              <span>See all projects</span>
              <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </Reveal>

      {loading && (
        <div className="w-full px-5 sm:w-auto sm:px-0 flex gap-6 sm:gap-8 flex-wrap justify-center" aria-busy="true">
          <LoadingLabel>Loading projects…</LoadingLabel>
          <ProjectCardSkeleton />
          <div className="hidden sm:contents">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <p className="px-5 text-center text-slate-400 font-bricolage">New projects are on the way.</p>
      )}

      {!loading && onHomePage && projects.length > 0 && (
        <div className="w-full px-5 sm:hidden">
          <Carousel
            // Remount when the list changes (e.g. static → live content).
            key={projects.map((project) => project.id).join()}
            autoPlay={true}
            infiniteLoop={true}
            stopOnHover={true}
            swipeable={true}
            emulateTouch={true}
            showThumbs={false}
            centerMode={true}
            showArrows={false}
            showStatus={false}
            showIndicators={projects.length > 1}
            interval={4500}
            centerSlidePercentage={100}
            renderIndicator={(onClick, isSelected, index, label) => (
              <li key={index} className="inline-block">
                <button
                  type="button"
                  onClick={onClick}
                  aria-label={`${label} ${index + 1}`}
                  aria-current={isSelected || undefined}
                  className="h-6 w-6 inline-flex items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full bg-white transition-all duration-300 ${
                      isSelected ? "w-[18px] opacity-100" : "w-1.5 opacity-40"
                    }`}
                  />
                </button>
              </li>
            )}
          >
            {/* Bottom padding leaves room for the indicator dots. */}
            {cards.map((card) => (
              <div key={card.key} className="pb-12">
                {card}
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {!loading && (
        <StaggerGroup
          stagger={0.1}
          className={`${onHomePage ? "hidden sm:flex" : "flex"} w-full px-5 sm:w-auto sm:px-0 gap-6 sm:gap-8 flex-wrap justify-center`}
        >
          {cards.map((card) => (
            <StaggerItem key={card.key} className="w-full sm:w-auto">
              {card}
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </section>
  );
};

export default Projects;
