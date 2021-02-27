import React from "react";

const CardExample = () => {
  return (
    <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        alt=""
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
        src="/erin-lindford.jpg"
      />
      <div className="space-y-0.5">
        <p className="text-lg text-black font-semibold sm:bg-blue-100">
          Erin Lindford
        </p>
        <p className="text-gray-500 font-medium">Product Engineer</p>
        <button className="text-sm px-4 py-1 text-purple-600  font-semibold rounded-full border border-purple-500 hover:bg-purple-600 hover:border-transparent hover:text-white">
          Message
        </button>
      </div>
    </div>
  );
};

export default CardExample;
