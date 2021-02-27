import Link from "next/link";
import React, { useRef, useState } from "react";
import { useTransform, useViewportScroll } from "framer-motion";

import Dropdown from "./Dropdown/Dropdown";
import MobileMenu from "./Nav/MobileMenu";
import PageLinks from "./Nav/PageLinks";
import { imageBuilder } from "@utils/sanityClient";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRenderCount } from "@hooks/useRenderCount";
import styled from "styled-components";

interface DarkNavI {
  layoutInfo: LayoutInfo;
}

const GreyBG = styled.div`
  position: relative;
  background-image: url(/greyswirls.svg);
  background-attachment: fixed;
`;

const avatarDiameter = 45;

const DarkNav: React.FC<DarkNavI> = ({ layoutInfo, children }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const mainRef = useRef<HTMLBodyElement>(null);
  const { scrollY } = useViewportScroll();
  const rotateBG = useTransform(scrollY, (y) => y / 8);
  const { asPath } = useRouter();
  const avatarImg =
    layoutInfo?.me &&
    imageBuilder.image(layoutInfo.me.avatar).width(avatarDiameter).url();
  return (
    <GreyBG key={"layout_wrap"} className="relative bg-earthGrey min-h-screen">
      <div
        className="pb-32 bg-gray-800"
        style={{
          backgroundImage: `url(/tealswirls.svg)`,
          backgroundAttachment: "fixed",
          // backgroundSize: "400px",
        }}
      >
        <nav>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href={"/"} as="/">
                      <a>
                        <img src="/ikeworks.svg" width="60" />
                      </a>
                    </Link>
                  </div>
                  <PageLinks {...{ layoutInfo }} />
                  <div className="text-white opacity-30 mx-3 text-xl">
                    <span className="block sm:hidden">xs</span>
                    <span className="hidden sm:block md:hidden">sm</span>
                    <span className="hidden md:block lg:hidden">md</span>
                    <span className="hidden lg:block xl:hidden">lg</span>
                    <span className="hidden xl:block ">xl</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <div className="ml-3 relative">
                      <div>
                        <button
                          className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          id="user-menu"
                          aria-haspopup="true"
                          onClick={() => setShowProfileMenu((old) => !old)}
                        >
                          <span className="sr-only">Open user menu</span>
                          {avatarImg && (
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={avatarImg}
                              width={avatarDiameter}
                              height={avatarDiameter}
                            />
                          )}
                        </button>
                      </div>
                      <Dropdown
                        menuOpen={showProfileMenu}
                        onClose={() => setShowProfileMenu(false)}
                        position="left"
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {/*
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          */}
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    {/*
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          */}
                    <svg
                      className="hidden h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <MobileMenu />
        </nav>
        {/* <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>decorate here</p>
          </div>
        </header> */}
      </div>
      <main ref={mainRef} className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div
            key={asPath}
            className="bg-white rounded-lg shadow px-5 py-6 sm:px-6"
          >
            {children}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </GreyBG>
  );
};

export default DarkNav;
