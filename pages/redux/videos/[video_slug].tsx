import { GetStaticPaths, GetStaticProps } from "next";
import VideoSlug from "@pageComponents/VideoSlug";
import { projectVideo, projectVideoSlugs } from "@queries/videoQ";
import sanityClient from "@utils/sanityClient";

export default VideoSlug;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient.fetch(projectVideoSlugs, {
    project_id: "23b51cd8-cac3-43f0-a196-9ceae1d114ac", // redux project
  });
  console.log({ slugs });

  const paths = slugs?.map(({ title, video_slug }) => ({
    params: { video_slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { video_slug } = params;
  const customLinks = { text: "Reduce • Reuse • REDUX", href: "/redux" };
  const video = await sanityClient.fetch(projectVideo, {
    project_id: "23b51cd8-cac3-43f0-a196-9ceae1d114ac", // redux project
    video_slug,
  });
  const slugs = await sanityClient.fetch(projectVideoSlugs, {
    project_id: "23b51cd8-cac3-43f0-a196-9ceae1d114ac", // redux project
  });
  return { props: { customLinks, video, slugs } };
};
