interface SanityProjectI {
  _id: string;
  _type: "project";
  title: string;
  main_image: SanityImageSource;
  short_description: string;
  slug: { current: string };
}
