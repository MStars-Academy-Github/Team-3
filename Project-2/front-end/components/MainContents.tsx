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
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState<User>();

  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  useEffect(() => {
    (async () => {
      const result = await list({ userId: "63101b6a8863c69364fd5d0e" });
      console.log(result);
      setVideos(result);
    })();
  }, []);
  console.log(videos);

  return (
    <div className="container mx-auto mt-8">
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
