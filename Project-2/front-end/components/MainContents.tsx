import React, { ReactElement, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import axios from "axios";

type Props = {};

const MainContents = (props: Props) => {
  const [videos, setVideos] = useState([]);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  useEffect(() => {
    async () => {
      const result = await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/video/by${userId}`)
        .then((res) => setVideos(res.data));
    };
  }, []);
  return (
    <div className="container mx-auto mt-8">
      {videos.map((item: any) => (
        <ReactPlayer width={"300px"} controls={true} />
      ))}
    </div>
  );
};

export default MainContents;
