import DarkNav from "@components/Layout/DarkNav";
import { getHomeData, getLayoutInfo } from "@queries/homeQ";
import { GetStaticProps } from "next";
import Image from "next/image";

import HomePageMainCategory from "./HomePageMainCategory";

const HomePage = (props) => {
  const { layoutInfo, homeInfo } = props;

  const musicImg = homeInfo.me.photos.find((p) => p.slug === "music");
  const designImg = homeInfo.me.photos.find((p) => p.slug === "design");
  const devImg = homeInfo.me.photos.find((p) => p.slug === "dev");

  return (
    <div>
      <div className="flex justify-center">
        <Image src="/ikeworks_black.svg" height={200} width={200} />
      </div>
      <div className="flex flex-col md:flex-row justify-center border-t mt-4 mx-auto">
        <HomePageMainCategory
          key="dev"
          className="p-3"
          sanityImage={devImg?.image}
          title="Development"
          href="/dev"
          index={2}
        />
        <HomePageMainCategory
          key="music"
          className="p-3 flex-col align-middle"
          sanityImage={musicImg?.image}
          title="Music"
          href="/music"
          index={1}
        />
        <HomePageMainCategory
          key="design"
          className="p-3"
          sanityImage={designImg?.image}
          title="Design"
          href="/design"
          index={0}
        />
      </div>

      {/* <JTree data={props} /> */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const layoutInfo = await getLayoutInfo();
  const homeInfo = await getHomeData();
  return { props: { layoutInfo, homeInfo } };
};

export default HomePage;
