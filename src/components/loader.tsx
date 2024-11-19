"use client";

import { PuffLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export const SearchLoader = () => {
  return (
    <div className="h-[20vh] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
};
