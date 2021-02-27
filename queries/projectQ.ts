import groq from "groq";
import sanityClient from "@utils/sanityClient";

export const contentInfo = groq`{
  ...,
  blocks[]{
    ...,
    markDefs[]{
    ...,
     _type == "internal_link" => {
       "project_slug": project_ref -> slug.current,
       "page_slug": page_ref -> slug.current,
    }
    }
  }
}`;

export const pageSlugPaths = groq`
*[_type == "page"]{
"page_slug": slug.current,
"project_slug": project->slug.current
}
`;

const navInfo = groq`
  "navInfo": *[_type == "project" && slug.current == $project_slug][0]{
  "project_slug": slug.current,
  "pages": page_refs[]->{"page_slug": slug.current, title, _id}
}
`;
const projectsInfo = groq`
   "projects": *[_type == "project"]|order(start_date desc){
   "slug":slug.current,
   title
  }
`;

const pageInfo = groq`
{
  	title,
  	sections[]->{
      title,
      _id,
      slug,
      content[]${contentInfo}
    }
  }
`;

export const pageSlugQuery = groq`
  *[_type == "project" && slug.current == $project_slug][0]{
  _id,
  title,
  "isFirstPage": page_refs[0]->slug.current == $page_slug,
  "page": *[_type == 'page' && references(^._id) && slug.current == $page_slug][0] ${pageInfo},
  ${navInfo},
  ${projectsInfo}
}
`;

export const pagePathsNoPageSlug = groq`
  *[_type == "project"].slug.current
`;
export const pageQueryNoPageSlug = groq`
   *[_type == "project" && slug.current == $project_slug][0]{
  _id,
  title,
  "isFirstPage": true,
  "page": page_refs[0]-> ${pageInfo},
  ${navInfo},
  ${projectsInfo}
}
`;
