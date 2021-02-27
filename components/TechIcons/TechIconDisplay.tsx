import React from "react";
import classnames from "classnames";
import { imageBuilder } from "@utils/sanityClient";

const TechIconDisplay: React.FC<{
  techInfo: TechInfo;
  handleClickIcon?: (devSlug: string) => void;
}> = ({ techInfo }) => {
  const { slug, icon, title, name_logo } = techInfo;
  const iconSize = 50;
  const iconUrl = imageBuilder
    .image(icon)
    .width(iconSize)
    .height(iconSize)
    .url();
  return (
    <div
      className={classnames("tooltip relative cursor-pointer rounded p-1", {})}
    >
      <img src={iconUrl} height={iconSize} width={iconSize} />
    </div>
  );
};

export default TechIconDisplay;
