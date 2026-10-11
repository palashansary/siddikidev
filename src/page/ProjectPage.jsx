import React from "react";
import Projects from "../components/Projects";
import PageLayout from "./PageLayout";

const ProjectPage = () => (
  <PageLayout title="Projects">
    <Projects onHomePage={false} />
  </PageLayout>
);

export default ProjectPage;
