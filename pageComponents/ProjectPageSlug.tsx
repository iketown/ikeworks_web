import Layout from "@components/Layout/Layout";
import ProjectPageIndex from "@components/ProjectPage/ProjectPageIndex";
import { getLayoutInfo } from "@queries/homeQ";
import { pageSlugPaths, pageSlugQuery } from "@queries/projectQ";
import sanityClient from "@utils/sanityClient";
import { GetStaticPaths, GetStaticProps } from "next";

export const ProjectPage = ({ data, layoutInfo }) => {
  return <ProjectPageIndex pageInfo={data} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await sanityClient.fetch(pageSlugPaths);
  return {
    paths: projects.map((params) => ({ params })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project_slug = params.project_slug as string;
  const page_slug = params.page_slug;
  const data = await sanityClient.fetch(pageSlugQuery, {
    project_slug,
    page_slug,
  });
  const layoutInfo = await getLayoutInfo();

  return { props: { data, layoutInfo } };
};

export default ProjectPage;
