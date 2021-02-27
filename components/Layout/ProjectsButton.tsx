import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown/Dropdown";

const ProjectsButton: React.FC<{
  projects: ProjectBasicInfo[];
  className?: string;
}> = ({ projects, className }) => {
  const onBlurRef = useRef(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const { push, asPath } = useRouter();
  const isCurrent = asPath.includes("projects");
  const onFocus = () => {
    clearTimeout(onBlurRef.current);
    setProjectsOpen(true);
  };
  const onBlur = () => {
    onBlurRef.current = setTimeout(() => {
      setProjectsOpen(false);
    }, 500);
  };
  return (
    <a
      href="#"
      className={`${className} px-3 py-2 rounded-md text-sm font-medium relative`}
      onClick={(e) => {
        push("/dev", `/dev`);
      }}
      onMouseOver={onFocus}
      onMouseOut={onBlur}
      {...{ onFocus, onBlur }}
    >
      Projects
      <Dropdown
        menuOpen={projectsOpen}
        onClose={() => setProjectsOpen(false)}
        position="right"
      >
        {projects.map(({ project_slug, title }) => {
          return (
            <Link
              key={project_slug}
              href="/dev/[project_slug]"
              as={`/dev/${project_slug}`}
            >
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {title}
              </a>
            </Link>
          );
        })}
      </Dropdown>
    </a>
  );
};

export default ProjectsButton;
