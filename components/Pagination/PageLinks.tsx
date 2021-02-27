import React from "react";
import Link from "next/link";
import { PreviousButton, NextButton } from "./PageNumbers";
import { useRouter } from "next/router";
import JTree from "@utils/JTree";

interface ProjectPageLinksI {
  navInfo: NavInfo;
}
const ProjectPageLinks2: React.FC<ProjectPageLinksI> = ({ navInfo }) => {
  const { query } = useRouter();
  const { project_slug, page_slug } = query;

  const myIndex = page_slug
    ? navInfo.pages?.findIndex(
        ({ page_slug: found_slug }) => found_slug === page_slug
      )
    : 0;

  const getButtonProps = (delta: number) => {
    const page = navInfo?.pages && navInfo.pages[myIndex + delta];
    if (!page) return { href: "/", as: "/", title: "home", disabled: true };
    const slug = page.page_slug;
    const title = page.title;
    return {
      href: "/dev/[project_slug]/[page_slug]",
      as: `/dev/${project_slug}/${slug}`,
      title,
      disabled: false,
    };
  };

  return (
    <div className="py-6">
      <nav className="border-t border-gray-200 px-4 max-w-xl mx-auto flex items-center justify-between ">
        <Link {...getButtonProps(-1)}>
          <a>
            <PreviousButton {...getButtonProps(-1)} />
          </a>
        </Link>
        <Link {...getButtonProps(1)}>
          <a>
            <NextButton {...getButtonProps(1)} />
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default ProjectPageLinks2;
