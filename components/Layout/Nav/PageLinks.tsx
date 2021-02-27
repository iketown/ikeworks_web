import React from "react";
import ProjectsButton from "../ProjectsButton";
import { useRouter } from "next/router";
import classnames from "classnames";
import Link from "next/link";
interface PageLinksI {
  layoutInfo: LayoutInfo;
}

const currentClass = "bg-gray-900 text-white";
const defaultClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

const PageLinks: React.FC<PageLinksI> = ({ layoutInfo }) => {
  const { projects } = layoutInfo;
  const { asPath } = useRouter();
  const getClasses = (pathFrag: string) =>
    classnames(
      {
        [currentClass]: asPath.includes(pathFrag),
        [defaultClass]: !asPath.includes(pathFrag),
      },
      `hover:text-white px-3 py-2 rounded-md text-sm font-medium `
    );
  return (
    <div className="ml-10 flex items-baseline space-x-4 capitalize">
      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
      {/* <ProjectsButton {...{ projects }} className={getClasses("projects")} /> */}
      {["dev", "music", "design"].map((page) => {
        return (
          <Link key={page} href={`/${page}`}>
            <a href="#" className={getClasses(page)}>
              {page}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default PageLinks;
