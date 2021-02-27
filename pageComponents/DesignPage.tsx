import React from "react";
import DarkNav from "../components/Layout/DarkNav";
import { GetStaticProps } from "next";
import { getLayoutInfo } from "@queries/homeQ";
import { AnimatePresence, motion } from "framer-motion";

const DesignPage = (props) => {
  return (
    <AnimatePresence>
      <h2 key="design" className="font-title text-4xl text-earthWater">
        Design Page
      </h2>
    </AnimatePresence>
  );
};

export default DesignPage;

export const getStaticProps: GetStaticProps = async () => {
  const layoutInfo = await getLayoutInfo();
  return { props: { layoutInfo } };
};
