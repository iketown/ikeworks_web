import groq from "groq";
import sanityClient from "../utils/sanityClient";

const devHomeQ = groq`
  {
    "projects": *[_type == "project"]|order(start_date desc){
    title,
    slug,
    short_description,
    main_image,
    tech[]->{"slug": slug.current}
    },
    "tech": *[_type == "tech"]{
      title,
      "slug": slug.current,
      icon,name_logo,
      "used_on": *[_type == "project" && references(^._id)].slug.current
    } 
  }
`;

export const getDevHomeData = () => {
  return sanityClient.fetch(devHomeQ);
};
