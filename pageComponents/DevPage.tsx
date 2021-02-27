import ProjectCard from "@components/ProjectCards/ProjectCard";
import { getDevHomeData } from "@queries/devQ";
import { getLayoutInfo } from "@queries/homeQ";
import classnames from "classnames";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { GetStaticProps } from "next";
import React, { memo, useState } from "react";

import TechIconDisplay from "../components/TechIcons/TechIconDisplay";
import TechIconRow from "../components/TechIcons/TechIconRow";
import { useRenderCount } from "../hooks/useRenderCount";
import JTree from "../utils/JTree";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const listItemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const DevPage = (props) => {
  useRenderCount("DevPage");
  const { projects, tech } = props;
  const [chosenDevs, setChosenDevs] = useState<string[]>([]);
  const toggleDev = (devSlug: string) => {
    if (chosenDevs.includes(devSlug)) {
      setChosenDevs((old) => [...old].filter((s) => s !== devSlug));
    } else {
      setChosenDevs((old) => [...old, devSlug]);
    }
  };
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      key="motion-dev"
    >
      <div className="max-w-lg mx-auto py-10 text-center">
        <h1 className="font-title text-4xl  text-earthMaroon">
          Web Development
        </h1>
        <div className="mt-10 mb-4 relative">
          {chosenDevs.length ? (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ bottom: -40, x: "-50%" }}
              onClick={() => setChosenDevs([])}
              className={classnames(
                "border border-1 text-sm text-gray-400 bg-white hover:bg-blue-300 hover:text-white rounded-md p-1 absolute -mt-12 "
              )}
            >
              clear all
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-200 absolute "
              style={{ bottom: -20, left: "50%", x: "-50%" }}
            >
              select icon to see affiliated projects
            </motion.div>
          )}
          <TechIconRow
            tech={tech}
            toggleDev={toggleDev}
            chosenDevs={chosenDevs}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          return (
            <motion.div
              variants={listItemVariants}
              className="max-w-sm m-3 relative"
            >
              <div className="absolute -top-2 -left-2 flex">
                <AnimateSharedLayout>
                  <AnimatePresence>
                    {tech
                      .filter((tech) =>
                        project?.tech?.find(({ slug }) => slug === tech.slug)
                      )
                      .map((tech: TechInfo) => {
                        if (!chosenDevs.includes(tech.slug)) return null;

                        return (
                          <motion.div
                            layout
                            key={`addon-${tech.slug}`}
                            className="bg-white shadow-lg rounded-sm mr-1 z-10"
                            exit={{ scale: 0, transition: { duration: 0.2 } }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <TechIconDisplay key={tech.slug} techInfo={tech} />
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </AnimateSharedLayout>
              </div>
              <ProjectCard {...project} />
            </motion.div>
          );
        })}
      </div>
      {/* <JTree data={props} /> */}
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const layoutInfo = await getLayoutInfo();
  const { projects, tech } = await getDevHomeData();
  return { props: { layoutInfo, projects, tech } };
};

export default memo(DevPage);
