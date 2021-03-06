import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "iq4ljxqp",
  dataset: "production",
  useCdn: true,
});

export const imageBuilder = imageUrlBuilder(client);
export default client;
