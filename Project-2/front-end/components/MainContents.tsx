import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import { FaPlay } from "react-icons/fa";
type Props = {};

const MainContents = (props: Props) => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  return (
    <div className="container mx-auto mt-8">
      <ReactPlayer width={"300px"} url="vi.mp4" controls={true} />
    </div>
  );
};

export default MainContents;
