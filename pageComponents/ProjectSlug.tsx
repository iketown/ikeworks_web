import sanityClient from "@utils/sanityClient";
import { GetStaticPaths, GetStaticProps } from "next";

import { pagePathsNoPageSlug, pageQueryNoPageSlug } from "@queries/projectQ";
import { ProjectPage } from "./ProjectPageSlug";
import { getLayoutInfo } from "@queries/homeQ";

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await sanityClient.fetch(pagePathsNoPageSlug);
  return {
    paths: projects.map((project_slug: string) => ({
      params: { project_slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project_slug = params.project_slug as string;
  const data = await sanityClient.fetch(pageQueryNoPageSlug, {
    project_slug,
  });
  const layoutInfo = await getLayoutInfo();
  return { props: { data, layoutInfo } };
};

export default ProjectPage;
