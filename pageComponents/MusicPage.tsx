import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DarkNav from "../components/Layout/DarkNav";
import { GetStaticProps } from "next";
import { getLayoutInfo } from "@queries/homeQ";
import { useRenderCount } from "../hooks/useRenderCount";

const MusicPage = (props) => {
  useRenderCount("MusicPage");
  return (
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-title text-4xl text-earthWater"
    >
      Music Page
    </motion.h2>
  );
};

export default memo(MusicPage);

export const getStaticProps: GetStaticProps = async () => {
  const layoutInfo = await getLayoutInfo();
  return { props: { layoutInfo } };
};
