import React from "react";
import { motion } from "framer-motion";
import TechIconDisplay from "./TechIconDisplay";

interface TechIconRowI {
  tech: TechInfo[];
  toggleDev: (devSlug: string) => void;
  chosenDevs: string[];
}
const TechIconRow: React.FC<TechIconRowI> = ({
  tech,
  toggleDev = (devSlug: string) => {
    console.log("clicked", devSlug);
  },
  chosenDevs,
}) => {
  const handleClickIcon = toggleDev;
  return (
    <div className="flex max-w-lg mx-auto justify-around ">
      {tech
        .sort((a, b) => {
          if (a.used_on.length === b.used_on.length)
            return a.slug < b.slug ? -1 : 1;
          return b.used_on.length - a.used_on.length;
        })
        .map((techInfo) => {
          const isSelected = chosenDevs.includes(techInfo.slug);
          const isUnselected = !!chosenDevs.length;
          return (
            <motion.button
              variants={iconVariants}
              animate={isSelected ? "large" : isUnselected ? "small" : "normal"}
              onClick={() => toggleDev(techInfo.slug)}
            >
              <TechIconDisplay
                {...{ techInfo, isSelected }}
                key={techInfo.slug}
              />
            </motion.button>
          );
        })}
    </div>
  );
};

export default TechIconRow;

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  normal: { scale: 1, opacity: 1 },
  large: { scale: 1.1, opacity: 1 },
  small: { scale: 0.8, opacity: 0.4 },
};
