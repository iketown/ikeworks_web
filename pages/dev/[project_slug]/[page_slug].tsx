import ProjectPage, {
  getStaticPaths as gsPaths,
  getStaticProps as gsProps,
} from "@pageComponents/ProjectPageSlug";

export default ProjectPage;
export const getStaticPaths = gsPaths;
export const getStaticProps = gsProps;
