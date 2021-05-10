import { imageBuilder } from "@utils/sanityClient";
import { useTransform, useViewportScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";

import PageLinks from "./Nav/PageLinks";

const GreyBG = styled.div`
  position: relative;
  /* background-image: url(/greyswirls.svg); */
  /* background-attachment: fixed; */
`;

const avatarDiameter = 45;

interface DNNLi {
  links: JSX.Element;
}

const DarkNavNoLinks: React.FC<DNNLi> = ({ links, children }) => {
  const mainRef = useRef<HTMLBodyElement>(null);
  const { scrollY } = useViewportScroll();
  const { asPath } = useRouter();

  return (
    <GreyBG key={"layout_wrap"} className="relative bg-earthGrey min-h-screen">
      <div
        className="pb-32 bg-gray-800"
        style={{
          backgroundImage: `url(/tealswirls.svg)`,
          backgroundAttachment: "fixed",
        }}
      >
        <nav>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex">
                  <div className="">
                    <Link href={"/"} as="/">
                      <a>
                        <img src="/ikeworks.svg" width="60" />
                      </a>
                    </Link>
                  </div>
                  {/* <div className="text-white opacity-30 mx-3 text-xl">
                    <span className="block sm:hidden">xs</span>
                    <span className="hidden sm:block md:hidden">sm</span>
                    <span className="hidden md:block lg:hidden">md</span>
                    <span className="hidden lg:block xl:hidden">lg</span>
                    <span className="hidden xl:block ">xl</span>
                  </div> */}
                </div>
                <div className=" ">{links}</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <main ref={mainRef} className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div
            key={asPath}
            className="bg-white rounded-lg shadow px-5 py-6 sm:px-6"
          >
            {children}
          </div>
        </div>
      </main>
    </GreyBG>
  );
};

// Nav with something OTHER than Dev - Music - Design in the links area:
interface DarkNavCustomI {
  links: any;
}
export const DarkNavCustomLinks: React.FC<DarkNavCustomI> = ({
  links,
  children,
}) => {
  const { text, href } = links;
  const linkEl = (
    <Link href={href} as={href}>
      <a className="text-white">{text}</a>
    </Link>
  );
  return <DarkNavNoLinks {...{ links: linkEl, children }} />;
};

// Nav with Dev - Music - Design in the links area:
interface DarkNavI {
  layoutInfo: LayoutInfo;
}

export const DarkNav: React.FC<DarkNavI> = ({ layoutInfo, children }) => {
  const links = <PageLinks {...{ layoutInfo }} />;
  return <DarkNavNoLinks {...{ links, children }} />;
};

export default DarkNav;
