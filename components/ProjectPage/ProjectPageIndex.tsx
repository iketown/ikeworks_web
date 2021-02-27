import PageLinks from "@components/Pagination/PageLinks";
import React, { useRef } from "react";
import Link from "next/link";
import BlockContent from "../BlockContent/BlockContent";
import CircleNav from "../Layout/ProjectCircleNav/CircleNav";
import { motion } from "framer-motion";

interface ProjectPageI {
  pageInfo: any;
}

const parentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const ProjectPageIndex: React.FC<ProjectPageI> = ({ pageInfo }) => {
  const { page, title, isFirstPage, navInfo } = pageInfo;
  return (
    <div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        {isFirstPage ? (
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                Project
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </span>
            </h1>
          </div>
        ) : (
          <div></div>
        )}
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          {page?.sections?.map(({ content, slug }, index) => {
            return content.map((c) => {
              return (
                <div
                  key={slug?.current}
                  id={slug?.current}
                  className="prose prose-indigo  text-gray-600  mx-auto "
                >
                  {c.display_header && (
                    <SectionTitle
                      titleText={c.display_header}
                      projectText={pageInfo.title}
                      project_slug={navInfo.project_slug}
                    />
                  )}
                  <BlockContent blocks={c.blocks} key={index} />
                </div>
              );
            });
          })}
        </motion.div>
      </div>
      <PageLinks {...{ navInfo }} />
      <div className="px-4 py-10 flex justify-center ">
        <CircleNav {...navInfo} />
      </div>
    </div>
  );
};

export default ProjectPageIndex;

const SectionTitle = ({
  titleText,
  projectText,
  project_slug,
}: {
  titleText: string;
  projectText: string;
  project_slug: string;
}) => {
  return (
    <div style={{ marginTop: "4rem" }}>
      <hr
        style={{ margin: "2rem 0 5px" }}
        className="border-earthMaroon border-1 border-t"
      />
      <div className="flex justify-between">
        <div className="text-earthMaroon text-4xl uppercase font-title">
          {titleText}
        </div>
        <Link href="/dev/[project_slug]" as={`/dev/${project_slug}`}>
          <a
            className="text-sm text-gray-300 font-thin "
            style={{ textDecoration: "none", color: "lightgray" }}
          >
            {projectText}
          </a>
        </Link>
      </div>
    </div>
  );
};
