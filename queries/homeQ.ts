import groq from "groq";
import sanityClient from "../utils/sanityClient";
const projectsQ = groq`
 {
   "projects": *[_type == 'project'] | order(start_date desc),
 }
`;

const layoutQ = groq`
{
  "projects": *[_type == "project"]| order(start_date desc){
  	title,
  	"project_slug": slug.current
    },
  "me": *[_type == 'me'][0]{
    avatar
  }
}
`;
export const getLayoutInfo = () => sanityClient.fetch(layoutQ);

const homeQ = groq`
  {"me": *[_type == "me"][0]{
    avatar,
    photos[]{image,"slug":photo_slug.current}
  }}
`;
export const getHomeData = () => sanityClient.fetch(homeQ);
