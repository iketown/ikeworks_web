import React from "react";

import ProjectCard from "./ProjectCard";

interface ProjectCardsI {
  projects: SanityProjectI[];
}
const ProjectCards: React.FC<ProjectCardsI> = ({ projects }) => {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-xl text-gray-500 ">
            What I've been up to lately.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {projects.map((project) => {
            return <ProjectCard key={project._id} {...project} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
