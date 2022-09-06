import React, { ReactElement, useEffect, useState } from "react";
import { list } from "../pages/api/api.media";
import dynamic from "next/dynamic";

type Props = {};
type User = {
  _id: string | Blob;
  firstName: String;
  lastName: String;
  password: String;
  register: String;
};
const MainContents = (props: Props) => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
      (async () => {
        const result = await list({ userId: user._id });
        console.log(result);
        setVideos(result);
      })();
    }
  }, []);
  console.log(videos);
  const genre = ["Animation", "Action", "Comedy", "Adventure"];
  return (
    <div className="container mx-auto mt-8">
      <div>
        {genre.map((e: string, i: number) => (
          <button
            key={i}
            className="border rounded-full p-2 w-48 ml-2 hover:bg-sky-500"
          >
            {e}
          </button>
        ))}
      </div>
      <div className="gap-2 columns-4">
        {videos.map((item: any) => (
          <div key={item._id} className="ml-2">
            <ReactPlayer
              url={`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/video/${item._id}`}
              width="100%"
              height={"inherit"}
              controls={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContents;
