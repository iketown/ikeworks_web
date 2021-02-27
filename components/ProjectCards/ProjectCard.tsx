import React from "react";
import Link from "next/link";
import { imageBuilder } from "@utils/sanityClient";

const ProjectCard: React.FC<SanityProjectI> = ({
  _id,
  title,
  short_description,
  main_image,
  slug,
}) => {
  const imageUrl = imageBuilder.image(main_image).width(400).height(300).url();
  const link_href = "/dev/[project_slug]";
  const link_as = `/dev/${slug.current}`;
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform ease-in transform hover:scale-105">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover " src={imageUrl} alt="" />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <Link href={link_href} as={link_as}>
            <div className="block mt-2 cursor-pointer">
              <p className="text-xl font-semibold text-earthBlue">{title}</p>
              <p className="mt-3 text-base text-gray-500 h-24 overflow-y-scroll">
                {short_description}
              </p>
            </div>
          </Link>
        </div>
      </div>
      {/* <JTree data={{ _id }} /> */}
    </div>
  );
};

export default ProjectCard;
