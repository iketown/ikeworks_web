import React from "react";
import { getLayoutInfo } from "@queries/homeQ";
import { getDevHomeData } from "@queries/devQ";
import { projectVideo, projectVideoInfos } from "@queries/videoQ";
import sanityClient from "@utils/sanityClient";
import { SiRedux } from "react-icons/si";
import { GetStaticProps } from "next";
import Link from "next/link";
import BlockContent from "@components/BlockContent/BlockContent";

const ReduxHome = (props) => {
  const { videos } = props;
  return (
    <div>
      <h3 className="text-3xl text-gray-700 font-mono text-center mb-10">
        Reduce • Reuse • Redux
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4">
        {videos.map((video) => {
          return (
            <Link
              href="/redux/videos/[video_slug]"
              as={`/redux/videos/${video.video_slug}`}
            >
              <a
                key={video.title}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0 mr-2">
                  <SiRedux color="purple" size="2rem" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 uppercase underline mb-2">
                    {video.title}
                  </p>
                  {video.synopsis && (
                    <div className="text-xs text-gray-400 ">
                      <BlockContent blocks={video.synopsis} />
                    </div>
                  )}
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ReduxHome;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const customLinks = { text: "Reduce • Reuse • REDUX", href: "/redux" };

  const videos = await sanityClient.fetch(projectVideoInfos, {
    project_id: "23b51cd8-cac3-43f0-a196-9ceae1d114ac", // redux project
  });

  return { props: { customLinks, videos } };
};
