import React from "react";
import { imageBuilder } from "@utils/sanityClient";
import styled from "styled-components";
import Link from "next/link";

const PicCircle = styled.div`
  border-radius: 100%;
  overflow: hidden;
  height: 200px;
  width: 200px;
  transition: all 0.5s;
  border-width: 2px;
  border-color: white;
  border-style: solid;
  cursor: pointer;
  margin: 5px auto;
  :hover {
    border-color: black;
  }
`;

interface HPMCI {
  sanityImage: any;
  title: string;
  className?: string;
  href: string;
  index: number;
}
const HomePageMainCategory: React.FC<HPMCI> = ({
  sanityImage,
  title,
  className,
  href,
  index,
}) => {
  const url = sanityImage
    ? imageBuilder.image(sanityImage).width(200).height(200).url()
    : "https://via.placeholder.com/200x200";
  return (
    <Link href={href}>
      <a className={className}>
        <PicCircle className="hover:shadow-lg">
          <img src={url} height={200} width={200} />
        </PicCircle>
        <h3 className="font-title text-3xl text-earthMaroon text-center ">
          {title}
        </h3>
      </a>
    </Link>
  );
};

export default HomePageMainCategory;
