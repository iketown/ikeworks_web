import React, { useRef, useEffect, useState, useMemo } from "react";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import useDimensions from "react-cool-dimensions";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const VideoSlug = (props) => {
  console.log(props);

  const { myNum, nextVideo, prevVideo } = useMemo(() => {
    const myNum = Number(props.video.num);
    const slugsInOrder = props.slugs
      .map(({ num, title, video_slug }) => {
        return { title, num: Number(num), video_slug };
      })
      .sort((a, b) => a.num - b.num);

    const myIndex = slugsInOrder.findIndex(({ num }) => num === myNum);
    const nextVideo = slugsInOrder[myIndex + 1];
    const prevVideo = slugsInOrder[myIndex - 1];
    return { myNum, nextVideo, prevVideo };
  }, [props]);

  console.log({ myNum, nextVideo, prevVideo });
  const { title, youtube_url, num } = props.video;
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const { observe } = useDimensions({
    onResize: ({ width, height }) => {
      setDimensions({ width, height });
    },
  });
  const divHeight = Math.ceil((dimensions.width * 9) / 16);
  return (
    <div>
      <div
        ref={observe}
        style={{ height: divHeight }}
        className="bg-purple-700"
      >
        <ReactPlayer
          url={youtube_url}
          width={dimensions.width}
          height={divHeight}
        />
      </div>
      <div className="flex justify-between">
        <VideoLink prev video={prevVideo} />
        <div className="text-xl">{title}</div>
        <VideoLink next video={nextVideo} />
      </div>
    </div>
  );
};

export default VideoSlug;

interface VideoLinkI {
  video: { title: string; video_slug: string };
  prev?: boolean;
  next?: boolean;
}

const VideoLink: React.FC<VideoLinkI> = ({ video, prev, next }) => {
  if (!video) return <div>•</div>;
  return (
    <Link
      href={`/redux/videos/[video_slug]`}
      as={`/redux/videos/${video.video_slug}`}
    >
      <div className="flex space-x-2 align-middle mt-2 cursor-pointer">
        {prev && <FaArrowLeft size="1.5rem" />}
        <a className="text-lg underline">{video.title}</a>
        {next && <FaArrowRight size="1.5rem" />}
      </div>
    </Link>
  );
};
