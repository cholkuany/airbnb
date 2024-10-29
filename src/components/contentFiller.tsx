"use client";

import { PuffLoader } from "react-spinners";

export const LoadSuspense = () => {
  return (
    <div className="h-[15vh] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export const CategoriesSuspense = () => {
  return new Array(15).fill(0).map((index) => (
    <div
      key={index}
      className="h-[4vh] flex flex-col justify-center items-center"
    >
      <PuffLoader size={20} color="red" />
    </div>
  ));
};
