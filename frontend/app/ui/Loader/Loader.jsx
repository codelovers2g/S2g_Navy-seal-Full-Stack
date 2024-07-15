import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader1 = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ScaleLoader color="rgb(61 131 247)" />
    </div>
  );
};

export default Loader1;
