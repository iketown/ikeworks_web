import React from "react";
import styled from "styled-components";

const FlexCardExample = () => {
  return (
    <div className="my-10 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            src="store.jpeg"
            alt=""
            className="h-48 w-full object-cover md:w-48"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Case Study
          </div>
          <a href="#" className="block mt-1 text-lg font-semibold">
            Finding customers fo yo biznits
          </a>
          <p className="mt-2 text-gray-500">
            {" "}
            Getting a new biznits off the ground is shitty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlexCardExample;
