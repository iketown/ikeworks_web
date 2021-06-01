import groq from "groq";

// single video info
export const projectVideo = groq`
  *[_type == 'video' && references($project_id) && slug.current == $video_slug][0]{
  ...,
  "video_slug": slug.current,
  "num": vid_number.current,
  title,
  youtube_url,
}
`;

// all video slugs
export const projectVideoSlugs = groq`
  *[_type == 'video' && references($project_id)] | order(vid_number.current asc) {
  "video_slug": slug.current,
  "num": vid_number.current,
  title,
}
`;

export const projectVideoInfos = groq`
*[_type == 'video' && references($project_id)]| order(vid_number.current asc) {
	"video_slug": slug.current,
  title,
  youtube_url,
  synopsis
}
`;

export const projectVideoIntro = groq`
  *[_type == 'section' && references($project_id) && slug.current == $slug ][0] {
"blocks": content[0].blocks
}
`;
