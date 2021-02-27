import React from "react";
import classnames from "classnames";
import { HiCheck } from "react-icons/hi";
import Link from "next/link";

const navColor = "earthMaroon";

const PageCompleted: React.FC<NavButton> = ({
  final,
  stage,
  title,
  lastVisit,
  project_slug,
  page_slug,
}) => {
  return (
    <li
      className={classnames("relative", {
        "pb-10": !final,
      })}
    >
      {!final && (
        <div
          className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-${navColor} `}
          aria-hidden="true"
        />
      )}
      <Link
        href={"/dev/[project_slug]/[page_slug]"}
        as={`/dev/${project_slug}/${page_slug}`}
      >
        <a className="relative flex items-start group">
          <Circle {...{ stage, page_slug }} key={`${page_slug}${stage}`} />
          <span
            className={classnames("ml-4 min-w-0 flex flex-col", {
              "opacity-50": stage === "completed",
            })}
          >
            <span className="text-xs font-semibold uppercase tracking-wide">
              {title}
            </span>
            {lastVisit && (
              <span className="text-xs text-gray-500">{lastVisit}</span>
            )}
          </span>
        </a>
      </Link>
    </li>
  );
};

export default PageCompleted;

const Circle = ({ stage }: { stage: PageStage }) => {
  switch (stage) {
    case "upcoming":
      return <UpcomingCircle />;
    case "completed":
      return <Completed />;
    case "current":
      return <CurrentCircle />;
    default:
      return <div>NO STAGE VALUE</div>;
  }
};

const Completed = () => (
  <span className="h-9 flex items-center">
    <span
      className={`relative z-10 w-8 h-8 flex items-center justify-center bg-${navColor} rounded-full group-hover:${navColor}`}
    >
      <HiCheck color="white" />
    </span>
  </span>
);

const CurrentCircle = () => (
  <span className="h-9 flex items-center" aria-hidden="true">
    <span
      className={`relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-${navColor} rounded-full`}
    >
      <span className={`h-2.5 w-2.5 bg-${navColor} rounded-full`} />
    </span>
  </span>
);

const UpcomingCircle = () => (
  <span className="h-9 flex items-center" aria-hidden="true">
    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
    </span>
  </span>
);
