import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./Card";

import shoestore from "../images/projects/shoestore.webp";
import realestate from "../images/projects/realestate.webp";

import youtube from "../images/projects/youtube.webp";
import forkify from "../images/projects/forkify.webp";
import weather from "../images/projects/weather.webp";
import todo from "../images/projects/todo.webp";
import reactquiz from "../images/projects/reactquiz.webp";

const projects = [
  {
    name: "Shoe Store",
    image: shoestore,
    description:
      " I made Modern looking shoe Shoe Store using some on latest and on demand technology like next js and tailwind css .",
    slogan: ["#react", "#tailwind", "#modernweb"],

    link: "https://nike-shop-eta.vercel.app/",
  },

  {
    name: "Youtube App",
    image: youtube,
    description:
      "I have developed an innovative YouTube application utilizing React, Tailwind, and the YouTube API from Rapid API.",
    slogan: ["#react", "#tailwind", "#modernweb"],
    link: "https://nxtgenyoutubeapp.netlify.app",
  },
  {
    name: "React Quiz App",
    image: reactquiz,
    description:
      "Discover the React Quiz App, where engaging quizzes meet seamless user-friendliness. ",
    slogan: ["#react", "#tailwind", "#modernweb"],
    link: "https://react-quiz-nxtgen.netlify.app",
  },
  {
    name: "Food Recipe App",
    image: forkify,
    description:
      " Discover Forkify Your ultimate food recipe app! Explore mouthwatering recipes, personalized collections, and hassle-free shopping lists.",
    link: "https://forkifyofpalash.netlify.app",
  },
  {
    name: "Real Estate",
    image: realestate,
    description:
      " This exemplary real estate website showcases professionalism, simplicity, , setting industry standards .",
    slogan: ["#react", "#tailwind", "#modernweb"],
    link: "https://palashansary.github.io/RealEstateBeta2.0/",
  },
  {
    name: "Weatherly",
    image: weather,
    description:
      "Experience real-time weather updates with precision. Explore forecasts and conditions effortlessly with our intuitive Weatherly Stay informed, stay prepared",

    slogan: ["#react", "#tailwind", "#modernweb"],
    link: "https://weatherappnxt.netlify.app",
  },
  // {
  //   name: "TaskEase",
  //   image: todo,
  //   description:
  //     " Stay organized and efficient with My Cool TodoApp. Manage tasks easily and get things done hassle-free. ",
  //   slogan: ["#react", "#tailwind", "#modernweb"],
  //   link: "https://my-cool-todoapp.netlify.app",
  // },
];

const Projects = (props) => {
  return (
    <div className="h-full py-12 md:py-14 flex flex-col items-center justify-center z-0  overflow-hidden">
      <div className="mb-8 md:mb-10  flex flex-col items-center md:items-start md:w-[90%]">
        <span className="text-[1.6rem] md:text-[2.2rem] text-blue-400 font-bold font-bricolage  flex items-start">
          My Recent Projects
        </span>
        {/* <span className="text-[2.6rem] md:text-[3.4rem] text-white  font-bold ">
          Projects.
        </span> */}
        <div className="flex flex-col md:flex-row  justify-center md:justify-between items-center">
          <span className="mt-3  text-slate-100 w-4/5 md:w-3/5  text-[14px] leading-[16px] md:text-[18px] md:leading-[20px] font-bricolage">
            Following projects showcases my skills and experience throught
            real-world examples of my work. Each projects is briefly described
            with live demos in it.
          </span>

          {props.onHomePage && (
            <span className="text-white h-full w-[120px] px-3 py-1 bg-blue-950 mt-4 rounded-md cursor-pointer">
              <Link to="/projects">
                <div className="flex justify-between items-center">
                  <span> see more</span>
                  <span className="">
                    <FaLongArrowAltRight />
                  </span>
                </div>
              </Link>
            </span>
          )}
        </div>
      </div>

      {props.onHomePage && (
        <div className={`mt-5 sm:hidden `}>
          <div className="">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              centerMode={true}
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              interval={2000}
              centerSlidePercentage={100}
              width={340}
            >
              {projects.map((project) => (
                <Card
                  key={project.name}
                  name={project.name}
                  image={project.image}
                  description={project.description}
                  slogan={project.slogan}
                  link={project.link}
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}

      {props.onHomePage && (
        <div className="hidden  sm:flex gap-8 flex-wrap justify-center ">
          {projects.map((project) => (
            <Card
              key={project.name}
              name={project.name}
              image={project.image}
              description={project.description}
              slogan={project.slogan}
              link={project.link}
            />
          ))}
        </div>
      )}

      {!props.onHomePage && (
        <div className="flex gap-8 flex-wrap justify-center ">
          {projects.map((project) => (
            <Card
              key={project.name}
              name={project.name}
              image={project.image}
              description={project.description}
              slogan={project.slogan}
              link={project.link}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
